import { NextApiResponse, NextApiRequest } from 'next';
import User from '../models/usermodel';
import CatchAsync from '@/utils/catchAsync';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { userValidate, userUpdateValidate } from '@/utils/backendValidator';
import { JwtPayload, NextApiRequestExtended } from '@/types';

const createSendToken = (
	user: any,
	statusCode: number,
	res: NextApiResponse,
	message: string,
	selected: string[],
) => {
	const token = jwt.sign(
		{ id: user._id, role: user.role, name: user.name, email: user.email },
		'this-is-our-super-authentication-methode-with-jwt-token',
		{
			expiresIn: '10d',
		},
	);
	res.setHeader(
		'Set-Cookie',
		serialize('getrostam', token, {
			sameSite: 'strict',
			path: '/',
			expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
		}),
	);
	res.status(statusCode).json({
		status: 'success',
		message,
	});
};
export const signupUser = CatchAsync(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { name, email, password, slug } = req.body;
		const { error } = userValidate.validate({ name, email, password });

		if (error) {
			throw new Error('Please provide valid info');
		}
		const exist = await User.findOne({ email });
		if (exist) {
			throw new Error('User Already Exist');
		}
		const bcryptpass = await bcrypt.hash(password, 12);

		const newUser = await User.create({
			name: name.replace(/  +/g, ' '),
			slug,
			email,
			password: bcryptpass,
		});
		if (!newUser) throw new Error(newUser);
		createSendToken(newUser, 200, res, 'Account registered successfully', [
			'name',
			'slug',
			'email',
			'role',
		]);
	},
);
export const signinUser = CatchAsync(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(400).json({
				status: 'fail',
				message: 'Invalid Data',
			});

		const user = await User.findOne({ email }).select(
			'-__v -createdAt -updatedAt -orders',
		);

		if (!user || !(await bcrypt.compare(password, user.password))) {
			res.status(400).json({
				status: 'fail',
				message: 'Email or password is incorrect',
			});
		}
		createSendToken(user, 200, res, 'Successfully Login', [
			'name',
			'slug',
			'email',
			'role',
		]);
	},
);
export const getProfile = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		res.status(200).json({
			status: 'success',
			data: req.user,
		});
	},
);
export const authorized = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		if (!req.headers.cookie || !req.headers.cookie.startsWith('getrostam'))
			throw new Error('Please login.');

		const token = req.headers.cookie.split('=')[1];
		const decoded = jwt.verify(
			token,
			'this-is-our-super-authentication-methode-with-jwt-token',
		) as JwtPayload;
		if (!decoded) throw new Error('Please try again');
		const dateNow = Date.now();
		if (decoded.exp === dateNow / 1000 || decoded.exp < dateNow / 1000) {
			throw new Error(
				'Authentication token expired. Please login again.',
			);
		}
		const user = await User.findById(decoded.id).select(
			'email name slug active role thumbnail',
		);
		if (!user) {
			res.setHeader(
				'Set-Cookie',
				serialize('getrostam', '', {
					maxAge: -1,
					path: '/',
				}),
			);
			throw new Error('User not found');
		}
		req.user = user;
		next();
	},
);
export const logoutUser = async (
	req: NextApiRequestExtended,
	res: NextApiResponse,
) => {
	if (!req.user.email) throw new Error('Already logged out');
	res.setHeader(
		'Set-Cookie',
		serialize('getrostam', '', {
			maxAge: -1,
			path: '/',
		}),
	);
	res.status(200).json({
		status: 'success',
		message: 'Successfully Logout',
	});
};
export const restictUser = (...roles: string[]) => {
	return (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		if (!roles.includes(req.user.role)) {
			throw new Error('You dont have permission');
		}
		next();
	};
};
export const updateUser = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { name, email } = req.body;
		const { error } = userUpdateValidate.validate({ name, email });
		if (error) throw new Error('Provide valid info');
		const user = await User.findByIdAndUpdate(req.user._id, req.body, {
			runValidators: true,
			new: true,
		});
		if (!user) throw new Error('Oops! Please try again');
		res.status(200).json({
			status: 'success',
			message: 'Updated successfully',
		});
	},
);

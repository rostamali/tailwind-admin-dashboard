import type { NextApiResponse, NextApiRequest } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import {
	signupUser,
	signinUser,
	authorized,
	getProfile,
	logoutUser,
	updateUser,
} from '@/backend/controller/usercontroller';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from '@/types';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/auth/profile', authorized, getProfile)
	.get('/api/auth/info', authorized, getProfile)
	.post('/api/auth/logout', authorized, logoutUser)
	.post('/api/auth/signup', signupUser)
	.post('/api/auth/signin', signinUser)
	.put('/api/auth/update', authorized, updateUser);

export default router.handler({
	onError,
	onNoMatch,
});

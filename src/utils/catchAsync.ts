import { NextApiRequest, NextApiResponse } from 'next';

const CatchAsync = (handler: any) => {
	return async (req: NextApiRequest, res: NextApiResponse, next: any) => {
		return handler(req, res, next).catch((error: any) => {
			if (error.code === 11000)
				return res.status(200).json({
					status: 'fail',
					message: 'Post is already exist. Change the Title.',
				});
			return res.status(200).json({
				status: 'fail',
				message: error.message || error,
			});
		});
	};
};
export default CatchAsync;

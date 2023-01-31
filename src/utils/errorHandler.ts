import { NextApiRequest, NextApiResponse } from 'next';
export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
	res.status(404).end(`Request url: ${req.url} not found.`);
};
export const onError = (
	err: any,
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	res.status(502).json({
		status: 'fail',
		message: err,
	});
};

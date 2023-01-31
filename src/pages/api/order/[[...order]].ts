import type { NextApiResponse, NextApiRequest } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';

import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from '@/types';
import { getInvoice } from '@/backend/controller/ordercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/order/invoice', getInvoice);

export default router.handler({
	onError,
	onNoMatch,
});

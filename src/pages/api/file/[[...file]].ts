import type { NextApiResponse, NextApiRequest } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from '@/types';
import {
	deleteImage,
	getImages,
	resizeUserPhoto,
	setImageInDb,
	uploadImages,
} from '@/backend/controller/filecontroller';
import { authorized, restictUser } from '@/backend/controller/usercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

export const config = {
	api: {
		bodyParser: false,
	},
};

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/file/images', getImages)
	.post(
		'/api/file/upload',
		authorized,
		restictUser('admin'),
		uploadImages,
		resizeUserPhoto,
		setImageInDb,
	)
	.delete('/api/file/delete/:name', deleteImage);

export default router.handler({
	onError,
	onNoMatch,
});

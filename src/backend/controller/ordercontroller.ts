import CatchAsync from '@/utils/catchAsync';
import { NextApiRequestExtended } from '@/types';
import { NextApiResponse } from 'next';
import pdfkit from 'pdfkit';
import PDFTable from 'pdfkit-table';

export const getInvoice = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const invoiceName = `invoice-47393.pdf`;

		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `inline; filename=${invoiceName}`);
		const order = {
			headers: ['Product', 'QTY', 'Price', 'Total'],
			rows: [
				['Product - 1', '2', '10', '20'],
				['Product - 2', '1', '30', '30'],
				['Product - 3', '3', '40', '120'],
				['Product - 4', '2', '5', '10'],
			],
		};
		const tableDoc = new PDFTable({ margin: 30, size: 'A4' });
		await tableDoc.table(order as any);
		tableDoc.pipe(res);
		tableDoc.end();
	},
);

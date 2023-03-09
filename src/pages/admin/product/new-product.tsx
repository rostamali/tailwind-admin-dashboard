import dbConnect from 'src/backend/dbConnect';
import Category from 'src/backend/models/categorymodel';
import AdminPageTitle from 'src/components/common/admin/AdminPageTitle';
import ProductForm from 'src/components/common/admin/ProductForm';
import AdminAuthLayout from 'src/components/layouts/AdminAuthLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

export type ProductCategory = {
	_id: string;
	title: string;
};

const NewProducts = ({ category }: { category: ProductCategory[] }) => {
	return (
		<>
			<Head>
				<title>Create Product</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
			</Head>
			<div className="add-product">
				<div className="pb-8">
					<AdminPageTitle
						title={'Add Product'}
						subtitle={'Admin / Product / New Product'}
					/>
				</div>
				<div className="create-product">
					<ProductForm category={category} />
				</div>
			</div>
		</>
	);
};
NewProducts.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};

export async function getServerSideProps() {
	await dbConnect();
	const data = await Category.find({}).select('title _id');

	return {
		props: { category: JSON.parse(JSON.stringify(data)) },
	};
}

export default NewProducts;

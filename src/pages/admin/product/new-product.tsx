import AdminPageTitle from '@/components/common/AdminPageTitle';
import ProductForm from '@/components/common/ProductForm';
import AdminAuthLayout from '@/components/layouts/AdminAuthLayout';
import { ReactElement } from 'react';
const NewProducts = () => {
	return (
		<>
			<div className="add-product">
				<div className="pb-8">
					<AdminPageTitle
						title={'Add Product'}
						subtitle={'Admin / Product / New Product'}
					/>
				</div>
				<div className="create-product">
					<ProductForm />
				</div>
			</div>
		</>
	);
};
NewProducts.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default NewProducts;

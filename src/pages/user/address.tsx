import UserAuthLayout from '@/components/layouts/UserAuthLayout';
import { ReactElement } from 'react';

const Address = () => {
	return (
		<div>
			<h3 className="user-page-title">Address</h3>
		</div>
	);
};
Address.getLayout = function getLayout(page: ReactElement) {
	return <UserAuthLayout>{page}</UserAuthLayout>;
};
export default Address;

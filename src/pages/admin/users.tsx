import AdminAuthLayout from '@/components/layouts/AdminAuthLayout';
import { ReactElement } from 'react';

const Users = () => {
	return (
		<div>
			<h1 className="text-2xl text-black">All User</h1>
		</div>
	);
};
Users.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default Users;

import { useCreateData, useFetchData } from '@/hooks/useApi';
import Spinner from '../common/Spinner';
import Login from '@/pages/login';
import Picture from '../common/Picture';
import { FaList, FaMapMarkerAlt } from 'react-icons/fa';
import {
	MdDashboardCustomize,
	MdAccountCircle,
	MdOutlineSecurity,
} from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserAuthLayout = ({ children }: any) => {
	const [loading, setLoading] = useState(true);
	const menu = [
		{
			icons: MdDashboardCustomize,
			label: 'Dashboard',
			path: '/user',
		},
		{
			icons: MdAccountCircle,
			label: 'My Account',
			path: '/user/my-account',
		},
		{
			icons: MdOutlineSecurity,
			label: 'Security',
			path: '/user/security',
		},
		{
			icons: FaList,
			label: 'Orders',
			path: '/user/orders',
		},
	];
	const router = useRouter();
	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);

	const { mutate: logout } = useCreateData('/api/auth/logout', 'auth');
	const handleLogout = () => {
		logout({});
	};
	useEffect(() => {
		setLoading(false);
	}, [router.pathname]);

	console.log('Loading ->', loading);

	return (
		<>
			{!isLoading ? (
				user.status === 'success' ? (
					<div
						id="user-layouts"
						className="bg-[#EAEDF7] py-20 h-screen"
					>
						<div className="container mx-auto h-full">
							<div className="flex gap-8 h-full">
								<div className="bg-white h-full w-[320px] py-10 px-10 rounded-md flex flex-col justify-between">
									<div className="user-menu-profile">
										<div className="flex flex-col gap-4 items-center justify-center">
											<div className="bg-white h-32 w-32 flex items-center justify-center rounded-full border border-[#6259CA]">
												<Picture
													link={
														user.data.thumbnail
															? `/uploads/${user.data.thumbnail}`
															: '/uploads/user.png'
													}
													classList={
														'h-28 w-28 rounded-full'
													}
													alt={user.data.name}
												/>
											</div>
											<div className="text-center">
												<h4 className="text-xl font-semibold text-[#A8ADB0] capitalize">
													Hello,
												</h4>
												<h4 className="text-xl font-bold text-[#0E0E23] capitalize">
													{user.data.name}
												</h4>
											</div>
										</div>
										<ul className="user-menu mt-10">
											{menu.map((item, index) => (
												<li key={index}>
													<Link
														href={item.path}
														className={`text-[#0E0E23] mb-3 h-[45px] flex items-center gap-3 rounded-md pl-[20px] text-base font-semibold ${
															router.pathname ===
															item.path
																? 'bg-[#F4F5FE] user-link-shadow'
																: ''
														}`}
													>
														<item.icons className="text-lg text-[#6259CA]" />
														{item.label}
													</Link>
												</li>
											))}
										</ul>
									</div>
									<button
										className="submit__btn"
										onClick={handleLogout}
									>
										Log out
									</button>
								</div>
								<div
									className={`bg-white flex-1 rounded-md
								`}
								>
									<div className="admin-content-wrapper px-14 py-14">
										{!loading ? (
											children
										) : (
											<div className="flex items-center justify-center h-full">
												<Spinner />
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Login />
				)
			) : (
				<div className="flex items-center justify-center h-screen bg-[#EAEDF7]">
					<Spinner />
				</div>
			)}
		</>
	);
};

export default UserAuthLayout;

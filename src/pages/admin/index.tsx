import { ReactElement } from 'react';
import AdminAuthLayout from '../../components/layouts/AdminAuthLayout';
import Head from 'next/head';
import Link from 'next/link';
import { FaChevronUp } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import { HiOutlineUser } from 'react-icons/hi';
import { MdOutlineMonetizationOn, MdReviews } from 'react-icons/md';
import { GrCart } from 'react-icons/gr';
import AdminPageTitle from 'src/components/common/admin/AdminPageTitle';
import Picture from 'src/components/common/shared/Picture';
import { useFetchData } from 'src/hooks/useApi';
import Spinner from 'src/components/common/shared/Spinner';
import Empty from 'src/components/common/admin/Empty';
import { FiPackage } from 'react-icons/fi';

type PaymentList = {
	createdAt: Date;
	orderId: { _id: string; total: number };
	paymentId: string;
	paymentMethod: string;
	status: string;
	user: {
		_id: string;
		userName: string;
		thumbnail: string;
		firstName: string;
		lastName: string;
	};
	_id: string;
};

const Dashboard = () => {
	const { data: dashboardInfo, isLoading } = useFetchData(
		'/api/dashboard/admin',
		'dashboardInfo',
		1,
	);

	const Info = [
		{
			title: 'Users',
			percent: 5,
			value: `${
				isLoading
					? 0
					: dashboardInfo.status === 'success'
					? dashboardInfo.user
					: 0
			}`,
			linkLabel: 'See all users',
			link: '/admin/users',
			icon: HiOutlineUser,
			iconBg: 'bg-[#FCD5D7]',
			iconColor: 'text-[#944E54]',
		},
		{
			title: 'Orders',
			percent: 2,
			value: `${
				isLoading
					? 0
					: dashboardInfo.status === 'success'
					? dashboardInfo.order
					: 0
			}`,
			linkLabel: 'See all orders',
			link: '/admin/orders',
			icon: GrCart,
			iconBg: 'bg-[#F9F0D5]',
			iconColor: 'text-[#CBAC63]',
		},
		{
			title: 'Products',
			percent: 7,
			value: `${
				isLoading
					? 0
					: dashboardInfo.status === 'success'
					? dashboardInfo.product
					: 0
			}`,
			linkLabel: 'See all products',
			link: '/admin/product',
			icon: FiPackage,
			iconBg: 'bg-[#C3E9C0]',
			iconColor: 'text-[#3B7933]',
		},
		{
			title: 'Reviews',
			percent: 1,
			value: `${
				isLoading
					? 0
					: dashboardInfo.status === 'success'
					? dashboardInfo.review
					: 0
			}`,
			linkLabel: 'See all reviews',
			link: '/admin/product/reviews',
			icon: MdReviews,
			iconBg: 'bg-[#E9CCE7]',
			iconColor: 'text-[#8C4293]',
		},
	];

	return (
		<>
			<Head>
				<title>Dashboard - Welcome to admin dashboard</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
			</Head>
			{isLoading ? (
				<div className="bg-white flex items-center justify-center h-[70vh] rounded-md">
					<Spinner />
				</div>
			) : dashboardInfo.status === 'success' ? (
				<div className="admin-dashboard">
					<div className="pb-8">
						<AdminPageTitle
							title={'Admin'}
							subtitle={'Dashboard'}
						/>
					</div>
					<div className="grid grid-cols-4 gap-6">
						{Info.map((item, index) => (
							<div
								className="single-box bg-white p-4 rounded-md"
								key={index}
							>
								<div className="flex items-center justify-between">
									<h5 className="text-[#C0C0C0] uppercase text-base font-semibold">
										{item.title}
									</h5>
									<div className="flex items-center text-[#29692C] gap-2">
										<FaChevronUp className="text-base font-bold" />
										<span className="text-base font-bold flex items-center">
											<BiPlus />
											{item.percent}%
										</span>
									</div>
								</div>
								<h3 className="text-black text-4xl font-normal py-4">
									{item.value}
								</h3>
								<div className="flex items-center justify-between">
									<Link
										href={item.link}
										className="text-sm text-black font-medium underline"
									>
										{item.linkLabel}
									</Link>
									<span
										className={`h-8 w-8 rounded-md flex items-center justify-center ${item.iconBg}`}
									>
										<item.icon
											className={`text-lg ${item.iconColor}`}
										/>
									</span>
								</div>
							</div>
						))}
					</div>
					<div className="latest-transaction bg-white p-10 rounded-md mt-6">
						<h3 className="text-black text-lg font-semibold pb-5">
							Latest Trasactions
						</h3>
						{dashboardInfo.data.length > 0 ? (
							<table className="w-full border-collapse">
								<thead className="bg-[#F0F1FF] border border-[#F0F1FF]">
									<tr>
										<th className="text-left py-3 pl-3">
											Order ID
										</th>
										<th className="text-left py-3">
											Customer
										</th>
										<th className="text-left py-3">Date</th>
										<th className="text-left py-3">
											Amount
										</th>
										<th className="py-3 text-center">
											Payment Method
										</th>
										<th className="text-center py-3 pr-3">
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{dashboardInfo.data.map(
										(item: PaymentList, index: number) => (
											<tr
												className="border border-[#F0F1FF] mb-2"
												style={{
													marginBottom: '10px',
												}}
												key={index}
											>
												<td className="py-2 pl-3">
													{item.orderId._id}
												</td>
												<td className="py-2">
													<div className="flex items-center gap-4">
														<Picture
															link={
																item.user
																	.thumbnail
																	? `/uploads/${item.user.thumbnail}`
																	: '/uploads/user.png'
															}
															classList={
																'h-[45px] w-[45px] rounded-full'
															}
															alt={
																item.user
																	.firstName
																	? `${item.user.firstName} ${item.user.lastName}`
																	: item.user
																			.userName
															}
														/>
														<span>
															{item.user.firstName
																? `${item.user.firstName} ${item.user.lastName}`
																: item.user
																		.userName}
														</span>
													</div>
												</td>
												<td>
													{new Date(
														item.createdAt,
													).toLocaleString('en-US', {
														timeZone: 'UTC',
														weekday: 'short',
														year: 'numeric',
														month: 'short',
														day: 'numeric',
													})}
												</td>
												<td className="capitalize">
													{item.orderId.total
														? `$${item.orderId.total.toFixed(
																2,
														  )}`
														: 0.0}
												</td>
												<td className="capitalize text-center">
													{item.paymentMethod}
												</td>
												<td className="text-center capitalize">
													<span
														className={`${
															item.status ===
															'success'
																? 'bg-[#D7EDD4] text-[#5E8460]'
																: 'bg-[#F3EFD7] text-[#C5B585]'
														}  text-sm py-1 px-2 rounded-md`}
													>
														{item.status}
													</span>
												</td>
											</tr>
										),
									)}
								</tbody>
							</table>
						) : (
							<Empty text={'No Item Found'} />
						)}
					</div>
				</div>
			) : (
				<div className="bg-white rounded-md">
					<Empty text={'No Item Found'} />
				</div>
			)}
		</>
	);
};
Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default Dashboard;
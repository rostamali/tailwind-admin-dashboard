import AdminPageTitle from '@/components/common/AdminPageTitle';
import CustomPagination from '@/components/common/CustomPagination';
import AdminAuthLayout from '@/components/layouts/AdminAuthLayout';
import { ReactElement, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
const Orders = () => {
	const [page, setPage] = useState(1);
	return (
		<>
			<div id="orders">
				<div className="pb-8 flex items-center justify-between">
					<div>
						<AdminPageTitle
							title={'Orders'}
							subtitle={'Admin / Product / Orders'}
						/>
					</div>
					<div className="flex  items-center gap-3">
						<input
							type="text"
							placeholder="Search by name..."
							className="input__field"
						/>
						<select className="input__field">
							<option value="">Status</option>
							<option value="">Mens</option>
							<option value="">Women</option>
							<option value="">Fashion</option>
						</select>
						<button className="submit__btn">Search</button>
					</div>
				</div>
				<div className="bg-white p-10 rounded-lg">
					<table className="w-full border-collapse">
						<thead className="bg-[#F0F1FF] border border-[#F0F1FF]">
							<tr>
								<th className="text-left py-3 pl-3">
									<input type="checkbox" name="" id="" />
								</th>
								<th className="text-left py-3">Order No.</th>
								<th className="text-left py-3">Customer</th>
								<th className="text-left py-3">Email</th>
								<th className="text-left py-3">Status</th>
								<th className="text-left py-3">Items</th>
								<th className="text-left py-3">Total</th>
								<th className="text-center py-3 pr-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
								<tr
									className="border border-[#F0F1FF] mb-2"
									style={{
										marginBottom: '10px',
									}}
									key={index}
								>
									<td className="pl-3">
										<input type="checkbox" name="" id="" />
									</td>
									<td className="py-2">{`AB56H${index}`}</td>
									<td>Dr. Soiab Akhter</td>
									<td>abc@sample.com</td>
									<td>
										<span className="bg-green-300 text-[#000] text-sm py-1 px-2 rounded-md">
											Processing
										</span>
									</td>
									<td>20</td>
									<td>$20.00</td>
									<td className="pr-3">
										<div className="flex items-center gap-2 justify-center">
											<button className="action__view">
												<HiEye className="text-[#000] text-base" />
											</button>
											<button className="action__delete">
												<RiDeleteBin5Line className="text-[#000] text-base" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex items-center justify-end pt-8">
						<CustomPagination
							currentpage={2}
							totalPage={5}
							handler={setPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
Orders.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default Orders;

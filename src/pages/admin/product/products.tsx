import AdminPageTitle from '@/components/common/AdminPageTitle';
import CustomPagination from '@/components/common/CustomPagination';
import Picture from '@/components/common/Picture';
import AdminAuthLayout from '@/components/layouts/AdminAuthLayout';
import { ReactElement, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
const Products = () => {
	const [page, setPage] = useState(1);

	return (
		<>
			<div id="admin-products">
				<div className="pb-8 flex items-center justify-between">
					<div>
						<AdminPageTitle
							title={'Products'}
							subtitle={'Admin / Product / Products'}
						/>
					</div>
					<div className="flex  items-center gap-3">
						<input
							type="text"
							placeholder="Search by name..."
							className="input__field"
						/>
						<select className="input__field">
							<option value="">Category</option>
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
								<th className="text-left py-3">Image</th>
								<th className="text-left py-3">Name</th>
								<th className="text-left py-3">Categories</th>
								<th className="text-left py-3">Reviews</th>
								<th className="text-left py-3">Stock</th>
								<th className="text-left py-3">Sale Price</th>
								<th className="text-left py-3">
									Regular Price
								</th>
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
									<td className="py-2">
										<Picture
											link={'/assets/user.jpg'}
											classList={
												'h-[45px] w-[45px] rounded-lg'
											}
											alt={''}
										/>
									</td>
									<td>Malcolm Lockyer</td>
									<td>Dress, Woemen, Fashion</td>
									<td>40</td>
									<td>20</td>
									<td>$20.00</td>
									<td>$40.00</td>
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
Products.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default Products;

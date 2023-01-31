import AdminPageTitle from '@/components/common/AdminPageTitle';
import CustomPagination from '@/components/common/CustomPagination';
import Picture from '@/components/common/Picture';
import SelectPhotos from '@/components/common/SelectPhotos';
import AdminAuthLayout from '@/components/layouts/AdminAuthLayout';
import { ReactElement, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Category = () => {
	const [page, setPage] = useState(1);
	const [photo, setPhoto] = useState<string[]>([]);

	return (
		<>
			<div className="product-category">
				<div className="pb-8 flex items-center justify-between">
					<div>
						<AdminPageTitle
							title={'Categorys'}
							subtitle={'Admin / Product / Category'}
						/>
					</div>
					<div className="flex  items-center gap-3">
						<input
							type="text"
							placeholder="Search by name..."
							className="input__field"
						/>
						<button className="submit__btn">Search</button>
					</div>
				</div>
				<div className="">
					<div className="grid grid-cols-3 gap-8">
						<div className="bg-white p-10 rounded-lg flex flex-col gap-4">
							<div className="input__group">
								<label htmlFor="ff" className="input__label">
									Name
								</label>
								<input type="text" className="input__field" />
							</div>
							<div className="input__group">
								<label htmlFor="ff" className="input__label">
									Parent
								</label>
								<select name="" id="" className="input__field">
									<option value="">Item 1</option>
									<option value="">Item 2</option>
									<option value="">Item 3</option>
									<option value="">Item 4</option>
								</select>
							</div>
							<div className="flex items-end gap-6 py-5">
								{photo.length ? (
									<Picture
										link={photo[0]}
										classList={
											'h-[120px] w-[120px] border-2 border-[#6259CA] rounded-full'
										}
										alt={''}
									/>
								) : (
									<Picture
										link={'/assets/user.jpg'}
										classList={
											'h-[120px] w-[120px] border-2 border-[#6259CA] rounded-full'
										}
										alt={''}
									/>
								)}
								<SelectPhotos
									btnText={'Upload Thumbnail'}
									handler={setPhoto}
									single={true}
									defaultVal={photo}
									preview={false}
								/>
							</div>
							<div className="input__group">
								<label htmlFor="ff" className="input__label">
									Description
								</label>
								<textarea
									name=""
									id=""
									className="border-[#cbcdd5] ring-0 focus:ring-0 focus:border-[#6259CA] h-[120px]"
								></textarea>
							</div>
							<button className="submit__btn">
								New Category
							</button>
						</div>
						<div className="bg-white p-10 rounded-lg col-span-2">
							<table className="w-full border-collapse">
								<thead className="bg-[#F0F1FF] border border-[#F0F1FF]">
									<tr>
										<th className="text-left py-3 pl-3">
											<input
												type="checkbox"
												name=""
												id=""
											/>
										</th>
										<th className="text-left py-3">
											Image
										</th>
										<th className="text-left py-3">Name</th>
										<th className="text-left py-3">
											Categories
										</th>
										<th className="text-left py-3">
											Parent
										</th>
										<th className="text-left py-3">Qty</th>
										<th className="text-center py-3 pr-3">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{[1, 2, 3, 4, 5, 6, 7].map(
										(item, index) => (
											<tr
												className="border border-[#F0F1FF] mb-2"
												style={{
													marginBottom: '10px',
												}}
												key={index}
											>
												<td className="pl-3">
													<input
														type="checkbox"
														name=""
														id=""
													/>
												</td>
												<td className="py-2">
													<Picture
														link={
															'/assets/user.jpg'
														}
														classList={
															'h-[45px] w-[45px] rounded-lg'
														}
														alt={''}
													/>
												</td>
												<td>Malcolm Lockyer</td>
												<td>Dress, Woemen, Fashion</td>
												<td>40</td>
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
										),
									)}
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
				</div>
			</div>
		</>
	);
};
Category.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default Category;

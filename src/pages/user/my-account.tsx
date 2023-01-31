import Head from 'next/head';
import UserAuthLayout from '@/components/layouts/UserAuthLayout';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchData, useUpdateData } from '@/hooks/useApi';
import Picture from '@/components/common/Picture';
import SelectPhotos from '@/components/common/SelectPhotos';
import ButtonLoader from '@/components/common/ButtonLoader';

const MyAccount = () => {
	const [photo, setPhoto] = useState<string[]>([]);
	const { data: user, isLoading: loadingUser } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);
	const { mutate: updateUserInfo, isLoading: isUpdate } =
		useUpdateData('auth');
	const { register, handleSubmit } = useForm();
	const updateUser = (data: any) => {
		data.thumbnail = photo[0];
		updateUserInfo({
			url: `/api/auth/update`,
			body: data,
		});
	};

	return (
		<>
			<Head>
				<title>My user account - Rostam</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="my-info">
				<h3 className="user-page-title">User Info</h3>
				<form
					className="admin-form"
					onSubmit={handleSubmit(updateUser)}
				>
					<div className="w-2/5 flex flex-col items-start gap-8 pb-12">
						{photo.length ? (
							<Picture
								link={`/uploads/${photo[0]}`}
								classList={
									'h-[120px] w-[120px] border-2 border-[#6259CA] rounded-full'
								}
								alt={''}
							/>
						) : (
							<Picture
								link={`/uploads/${user.data.thumbnail}`}
								classList={
									'h-[120px] w-[120px] border-2 border-[#6259CA] rounded-full'
								}
								alt={user.data.name}
							/>
						)}
						<div>
							<SelectPhotos
								btnText={'Upload Thumbnail'}
								handler={setPhoto}
								single={true}
								defaultVal={photo}
								preview={false}
							/>
							<span className="pt-2 block">
								Only allow png & jpg files
							</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-8">
						<div className="input__group flex flex-col">
							<label htmlFor="name" className="input__label">
								Full Name
							</label>
							<input
								id="name"
								type="text"
								defaultValue={user.data.name}
								className="input__field"
								{...register('name')}
							/>
						</div>
						<div className="input__group">
							<label htmlFor="email" className="input__label">
								E-mail
							</label>
							<input
								type="email"
								id="email"
								defaultValue={user.data.email}
								className="input__field"
								{...register('email')}
							/>
						</div>
						<div className="input__group">
							<label className="input__label">Role</label>
							<select
								className="input__field"
								defaultValue={user.data.role}
								{...register('role')}
							>
								<option value="admin">Admin</option>
								<option value="editor">Editor</option>
								<option value="user">User</option>
							</select>
						</div>
						<div className="input__group">
							<label className="input__label">
								Account Status
							</label>
							<select
								className="input__field"
								defaultValue={
									user.data.active ? 'true' : 'false'
								}
								{...register('active')}
							>
								<option value="true">Active</option>
								<option value="false">Inactive</option>
							</select>
						</div>
					</div>
					<button
						className="submit__btn mt-8 h-[52px] w-[172px]"
						disabled={isUpdate}
					>
						{isUpdate ? <ButtonLoader /> : 'Save Changes'}
					</button>
				</form>
			</div>
		</>
	);
};

MyAccount.getLayout = function getLayout(page: ReactElement) {
	return <UserAuthLayout>{page}</UserAuthLayout>;
};

export default MyAccount;
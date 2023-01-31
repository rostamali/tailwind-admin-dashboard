import dynamic from 'next/dynamic';
import { useState } from 'react';
import SelectPhotos from './SelectPhotos';
import Image from 'next/image';
import Picture from './Picture';
const TextEditor = dynamic(() => import('./TextEditor'), {
	ssr: false,
});

const ProductForm = () => {
	const [description, setDescription] = useState<any>();
	const [image, setImage] = useState<string[]>([]);
	const [gallery, setGallery] = useState<string[]>([]);
	return (
		<>
			<div className="product-form">
				<div className="grid grid-cols-4 gap-8">
					<div className="col-span-3 bg-white p-10 rounded-lg">
						<div className="grid grid-cols-2 gap-8">
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Name
								</label>
								<input type="text" className="input__field" />
							</div>
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Badge
								</label>
								<input type="text" className="input__field" />
							</div>
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Category
								</label>
								<select name="" id="" className="input__field">
									<option value="">Category</option>
									<option value="">Men</option>
									<option value="">Women</option>
									<option value="">Fashion</option>
									<option value="">Sports</option>
								</select>
							</div>
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Subcategory
								</label>
								<select name="" id="" className="input__field">
									<option value="">Subcategory</option>
									<option value="">Men</option>
									<option value="">Women</option>
									<option value="">Fashion</option>
									<option value="">Sports</option>
								</select>
							</div>
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Regular Price
								</label>
								<input type="number" className="input__field" />
							</div>
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Sale Price
								</label>
								<input type="number" className="input__field" />
							</div>
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Tags
								</label>
								<input type="text" className="input__field" />
							</div>
							<div className="input__group">
								<label htmlFor="f" className="input__label">
									Keywords
								</label>
								<input type="text" className="input__field" />
							</div>
						</div>
						<div className="pt-8">
							<span className="input__label mb-2 block">
								Description
							</span>
							<TextEditor
								defaultVal={undefined}
								handler={setDescription}
							/>
						</div>
					</div>
					<div className="col-span-1 bg-white p-10 rounded-lg">
						<div className="input__group mb-8">
							<span className="input__label">Image</span>
							<div className="flex flex-col items-start justify-center gap-4 w-full">
								{image.length ? (
									<Picture
										link={image[0]}
										classList={
											'h-36 w-36 rounded-md relative'
										}
										alt={'product'}
									/>
								) : (
									''
								)}
								<SelectPhotos
									btnText={'Select Image'}
									handler={setImage}
									single={true}
									defaultVal={image}
									preview={false}
								/>
							</div>
						</div>
						<div className="input__group">
							<span className="input__label">Gallery</span>
							<div className="flex items-center gap-4">
								{gallery.length
									? gallery.map((item, index) => (
											<div key={index}>
												<Picture
													link={item}
													classList={
														'h-36 w-36 rounded-md relative'
													}
													alt={'product'}
												/>
											</div>
									  ))
									: ''}
								<SelectPhotos
									btnText={'Select Gallery'}
									handler={setGallery}
									single={false}
									defaultVal={gallery}
									preview={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductForm;

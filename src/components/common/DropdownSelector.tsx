import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

const DropdownSelector = () => {
	const [countries, setCountries] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [selected, setSelected] = useState('');
	const [open, setOpen] = useState(false);

	// useEffect(() => {
	// 	fetch('https://restcountries.com/v2/all?fields=name')
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setCountries(data);
	// 		});
	// }, []);

	return (
		<>
			<Dropdown
				label={selected ? selected : 'Dropdown button'}
				inline={true}
				className="relative"
				dismissOnClick={true}
			>
				<div className="absolute bg-white mt-2 overflow-y-scroll h-[220px]">
					<div className="flex items-center px-2 sticky top-0 bg-white">
						<AiOutlineSearch size={18} className="text-gray-700" />
						<input
							type="text"
							value={inputValue}
							onChange={(e) =>
								setInputValue(e.target.value.toLowerCase())
							}
							placeholder="Enter country name"
							className="placeholder:text-gray-700 p-2 outline-none"
						/>
					</div>

					{countries &&
						countries.map((item: any, index) => (
							<Dropdown.Item
								key={index}
								className={`${
									item?.name?.toLowerCase() ===
										selected?.toLowerCase() &&
									'bg-sky-600 text-white'
								}
                     ${
							item?.name?.toLowerCase().startsWith(inputValue)
								? 'block'
								: 'hidden'
						}`}
								onClick={() => {
									if (
										item?.name?.toLowerCase() !==
										selected.toLowerCase()
									) {
										setSelected(item?.name);
										setOpen(false);
										setInputValue('');
									}
								}}
							>
								{item.name}
							</Dropdown.Item>
						))}
					{/* <ul className={``}>
						<div></div>
						{countries &&
							countries.map((country: any) => (
								<li
									key={country?.name}
									className={`p-2 text-sm hover:bg-sky-600 hover:text-white
         ${
				country?.name?.toLowerCase() === selected?.toLowerCase() &&
				'bg-sky-600 text-white'
			}
         ${
				country?.name?.toLowerCase().startsWith(inputValue)
					? 'block'
					: 'hidden'
			}`}
									onClick={() => {
										if (
											country?.name?.toLowerCase() !==
											selected.toLowerCase()
										) {
											setSelected(country?.name);
											setOpen(false);
											setInputValue('');
										}
									}}
								>
									{country.name}
								</li>
							))}
					</ul> */}
				</div>
			</Dropdown>
		</>
	);
};

export default DropdownSelector;

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<link
				href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;800;900;1000&display=swap"
				rel="stylesheet"
			></link>
			<body className="font-mulish">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head />
				<body>
					<Main />
					<NextScript />
					<script type='text/javascript' src='https://embed.thenewhumanitarian.org/helpers/iframeResizer.contentWindow.min.js'></script>
				</body>
			</Html>
		)
	}
}

import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head />
				<body>
					<Main />
					<NextScript />
					{/* <script type='text/javascript' src='https://embed.thenewhumanitarian.org/helpers/iframeResizer.contentWindow.min.js'></script> */}
					<Script src="https://embed.thenewhumanitarian.org/helpers/iframeResizer.contentWindow.min.js" />
				</body>
			</Html>
		)
	}
}

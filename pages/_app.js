import { ArticleProvider } from '@store/articleContext'

import '@styles/reset.css'
// import '@styles/tnh-base.css'
import '@styles/index.css'
import '@styles/global.css'
// import '@styles/tnh-addons.scss'
// import '@styles/timeline.scss'

function MyApp({ Component, pageProps }) {
	return (
		<ArticleProvider>
			<Component {...pageProps} />
		</ArticleProvider>
	)
}

export default MyApp

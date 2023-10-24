import { useEffect } from 'react'
import { ArticleProvider } from '@store/articleContext'

import '@styles/reset.css'
import '@styles/global.css'
import '@styles/tailwind.css'
// import '@styles/tnh-base.css'
// import '@styles/tnh-addons.scss'
// import '@styles/timeline.scss'

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		window.OneSignal = window.OneSignal || [];
		OneSignal.push(function () {
			OneSignal.init({
				appId: "b0bf70fc-486e-4f40-9fdc-ebc4c2bd30ce",
				notifyButton: {
					enable: true,
				},
				allowLocalhostAsSecureOrigin: true,
			});
		});

		return () => {
			window.OneSignal = undefined;
		};
	}, []); // <-- run this effect once on mount

	return (
		<ArticleProvider>
			<Component {...pageProps} />
		</ArticleProvider>
	)
}

export default MyApp

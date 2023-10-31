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
					// displayPredicate: function () { return true },
					displayPredicate: true,
					position: 'bottom-right',
					size: 'medium',
				},
				promptOptions: {
					customlink: {

						enabled: true, /* Required to use the Custom Link */
						style: "button", /* Has value of 'button' or 'link' */
						size: "medium", /* One of 'small', 'medium', or 'large' */
						color: {
							button: '#9f3e52', /* Color of the button background if style = "button" */
							text: '#fff', /* Color of the prompt's text */
						},
						text: {
							subscribe: "Subscribe to push notifications", /* Prompt's text when not subscribed */
							unsubscribe: "Unsubscribe from push notifications", /* Prompt's text when subscribed */
							explanation: "Get updates from all sorts of things that matter to you", /* Optional text appearing before the prompt button */
						},
						unsubscribeEnabled: true, /* Controls whether the prompt is visible after subscription */
					}
				},
				allowLocalhostAsSecureOrigin: true,
				subdomainName: "newhu",
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

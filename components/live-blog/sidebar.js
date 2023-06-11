import Link from 'next/link'
import LanguageSwitch from '@components/live-blog/languageSwitch'
import ArticleFilter from '@components/live-blog/articleFilter'

const Sidebar = ({ lang, title, liveBlogPages, showFilter, currentFilter, hideBackButton }) => {
	return (
		<div className='col-span-2'>
			{!hideBackButton && (
				<Link href={`${lang === 'en' ? '/car-live-blog/en' : '/car-live-blog/fr'}`}>
					<button className={'bg-burgundy px-3 py-1 text-white font-bold mb-5'}>{lang === 'en' ? '← Back to overview' : '← Retour'}</button>
				</Link>
			)}
			<h2>{title}</h2>
			<ul className={'list-none m-0 grid pt-2'}>
				{liveBlogPages.map((el, i) => {
					return (
						<li key={`live-blog-page-link-${i}`}>
							<Link href={`/car-live-blog/${lang}/pages/${el.slug}`}>{el.title}</Link>
						</li>
					)
				})}
				<LanguageSwitch lang={lang} baseUrl={'/car-live-blog'} />
				{showFilter && <ArticleFilter lang={lang} authors={showFilter} currentFilter={currentFilter} />}
			</ul>
		</div>
	)
}

export default Sidebar

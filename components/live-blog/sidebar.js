import Link from 'next/link'
import LanguageSwitch from '@components/live-blog/languageSwitch'
import ArticleFilter from '@components/live-blog/articleFilter'
import ArticleAuthorInfo from '@components/live-blog/articleAuthorInfo'

const Sidebar = ({ lang, title, liveBlogPages, showFilter, currentFilter, hideBackButton, author, className }) => {
	return (
		<div className={`${className || ''} col-span-2 bg-burgundy sm:bg-transparent p-3 sm:p-0`}>
			{!hideBackButton && (
				<Link href={`${lang === 'en' ? '/car-live-blog/en' : '/car-live-blog/fr'}`}>
					<button className={'bg-burgundy px-3 py-2 text-white font-normal text-sm mb-5'}>{lang === 'en' ? '← Back to overview' : '← Retour'}</button>
				</Link>
			)}
			<h2 className={'text-white sm:text-black'}>{title}</h2>
			<ul className={'list-none m-0 grid pt-2'}>
				{liveBlogPages.map((el, i) => {
					return (
						<li key={`live-blog-page-link-${i}-${el.slug}-${Math.random()}`}>
							<Link className={'text-white sm:text-inherit'} href={`/car-live-blog/${lang}/pages/${el.slug}`}>{el.title}</Link>
						</li>
					)
				})}
				<LanguageSwitch lang={lang} baseUrl={'/car-live-blog'} />
				{showFilter && <ArticleFilter lang={lang} authors={showFilter} currentFilter={currentFilter} />}
				{author && <ArticleAuthorInfo lang={lang} author={author} />}
			</ul>
		</div>
	)
}

export default Sidebar

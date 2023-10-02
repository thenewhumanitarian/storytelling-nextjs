import { useContext, useEffect } from 'react'
import { ArticleContext } from '@store/articleContext'

const ArticleChecker = ({ slug, invisible, setIsRead, showRemoveArticle, className, lang }) => {
	const { readArticles, addArticle, removeArticle } = useContext(ArticleContext)

	useEffect(() => {
		if (setIsRead) {
			addArticle(slug)
		}
	}, [slug])

	return (
		<div className={className}>
			<div className={invisible ? 'hidden' : ''}>
				<button key={`new-${slug}`} className={`text-red-600 font-bold flex flex-row align-center cursor-default ${!readArticles.includes(slug) ? '' : 'hidden'}`}>
					<div key={`new--${slug}`} className={'flex items-center gap-1'}>
						<span className={'rounded-full inline-block w-2 h-2 bg-red-600 animate-pulse duration-300'} />
						{lang === 'en' || !lang ? 'New' : 'Nouveau'}
					</div>
				</button>
			</div>
			<button onClick={() => removeArticle(slug)} key={`read-${slug}`} className={`text-gray-400 font-normal text-left inline hover:text-gray-900 ${showRemoveArticle && readArticles.includes(slug) ? '' : 'hidden'}`}>
				{lang === 'en' || !lang ? 'Mark as unread' : 'Marquer comme non lu'}
			</button>
		</div>
	)
}

export default ArticleChecker

import { useContext, useEffect } from 'react'
import { ArticleContext } from '@store/articleContext'

const ArticleChecker = ({ slug, invisible, setIsRead, showRemoveArticle, className }) => {
	const { readArticles, addArticle, removeArticle } = useContext(ArticleContext)

	useEffect(() => {
		if (setIsRead) {
			addArticle(slug)
		}
	}, [slug])

	return (
		<div className={`${invisible || readArticles.includes(slug) ? 'hidden' : ''} ${className} pr-2`}>
			{!readArticles.includes(slug) && (
				<>
					<button key={`new-${slug}`} className={'text-red-600 font-bold flex flex-row align-center'}>
						<div key={`new--${slug}`} className={'flex items-center gap-1'}>
							<span className={'rounded-full inline-block w-2 h-2 bg-red-600 animate-pulse duration-300'} />
							<span>New</span>
						</div>
					</button>
				</>
			)}
			{showRemoveArticle && readArticles.includes(slug) && (
				<button onClick={() => removeArticle(slug)} key={`read-${slug}`} className={'text-gray-400 font-normal text-left inline hover:text-gray-900'}>
					Mark as unread
				</button>
			)}
		</div>
	)
}

export default ArticleChecker

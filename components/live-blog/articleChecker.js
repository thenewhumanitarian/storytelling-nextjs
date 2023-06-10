import { useContext } from 'react'
import { ArticleContext } from '@store/articleContext'

const ArticleChecker = ({ slug, invisible, clickable, setIsRead }) => {
	const { readArticles, addArticle } = useContext(ArticleContext)

	const isRead = readArticles.includes(slug)

	if (setIsRead) {
		addArticle(slug)
	}

	return (
		<div className={invisible ? 'hidden' : ''} onClick={() => (clickable ? toggleRead() : null)}>
			{!isRead && (
				<button key={`new-${slug}`} className={'text-red-600 font-bold flex flex-row align-center'}>
					<div key={`new--${slug}`} className={'flex items-center gap-1'}>
						<span className={'rounded-full inline-block w-2 h-2 bg-red-600 animate-pulse duration-300'} />
						<span>New</span>
					</div>
				</button>
			)}
		</div>
	)
}

export default ArticleChecker

import { useContext, useEffect } from 'react'
import { ArticleContext } from '@store/articleContext'

const ArticleChecker = ({ slug, invisible, setIsRead, showRemoveArticle }) => {
	const { readArticles, addArticle, removeArticle } = useContext(ArticleContext)

	useEffect(() => {
		if (setIsRead) {
			addArticle(slug)
		}
	}, [slug])

	return (
		<>
			<div className={invisible ? 'hidden' : ''} key={Math.random()}>
				{!readArticles.includes(slug) ? (
					<button key={`new-${slug}`} className={'text-red-600 font-bold flex flex-row align-center'}>
						<div key={`new--${slug}`} className={'flex items-center gap-1'}>
							<span className={'rounded-full inline-block w-2 h-2 bg-red-600 animate-pulse duration-300'} />
							<span>New</span>
						</div>
					</button>
				) : (
					<></>
					// <button key={`new-${slug}`} className={'text-green-600 font-bold flex flex-row align-center'}>
					// 	<div key={`new--${slug}`} className={'flex items-center gap-1'}>
					// 		<span>✓</span>
					// 	</div>
					// </button>
				)}
			</div>
			{showRemoveArticle && readArticles.includes(slug) && (
				<div>
					<button
						onClick={() => removeArticle(slug)}
						key={`read-${slug}`}
						className={'text-gray-600 font-normal text-right w-full block hover:text-gray-900 italic'}
					>
						Mark unread
					</button>
				</div>
			)}
		</>
	)
}

export default ArticleChecker

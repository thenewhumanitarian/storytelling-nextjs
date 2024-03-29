import { useContext, useEffect, useState } from 'react'
import { ArticleContext } from '@store/articleContext'

const ArticleChecker = ({ slug, invisible, setIsRead, showRemoveArticle, className, lang }) => {
	const { readArticles, addArticle, removeArticle } = useContext(ArticleContext)

	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		if (hasMounted && setIsRead) {
			addArticle(slug);
		}
	}, [slug, hasMounted]);

	return (
		<div className={className}>
			<div className={invisible ? 'hidden' : ''}>
				{!readArticles.includes(slug) && (
					<button key={`new-${slug}`} className={'text-red-600 font-bold flex flex-row align-center cursor-default'}>
						<div key={`new--${slug}`} className={'flex items-center gap-1'}>
							<span className={'rounded-full inline-block w-2 h-2 bg-red-600 animate-pulse duration-300'} />
							{lang === 'en' || !lang ? 'New' : 'Nouveau'}
						</div>
					</button>
				)}
			</div>
			{showRemoveArticle && readArticles.includes(slug) && (
				<button onClick={() => removeArticle(slug)} key={`read-${slug}`} className={'text-gray-400 font-normal text-left inline hover:text-gray-900'}>
					{lang === 'en' || !lang ? 'Mark as unread' : 'Marquer comme non lu'}
				</button>
			)}
		</div>
	)
}

export default ArticleChecker

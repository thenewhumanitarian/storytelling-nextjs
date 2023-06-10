import { useEffect, useState } from 'react'

const ArticleChecker = ({ slug, setIsRead, invisible, clickable }) => {
	const [articleWasRead, setArticleWasRead] = useState(false)
	const [allArticles, setAllArticles] = useState([])

	useEffect(() => {
		// Get all read articles from localStorage
		let allReadArticles = []
		allReadArticles = JSON.parse(localStorage.getItem('readArticles')) || []

		setAllArticles(allReadArticles)

		// Check if the current article is in the array
		if (allReadArticles.includes(slug)) {
			setArticleWasRead(true)
		} else {
			setArticleWasRead(false)
			if (setIsRead) {
				// Set new localStorage including the slug from props to add this article to the list of read articles
				allReadArticles.push(slug)
				localStorage.setItem('readArticles', JSON.stringify(allReadArticles))
				console.log(`Article with slug ${slug} added to localStorage array.`)
			}
		}
	}, [allArticles])

	const toggleRead = () => {
		// Get all read articles from localStorage
		let allReadArticles = []
		allReadArticles = JSON.parse(localStorage.getItem('readArticles')) || []
		// Add article to array if not already in it, remove it if it is
		if (allReadArticles.includes(slug)) {
			allReadArticles.splice(allReadArticles.indexOf(slug), 1)
			setArticleWasRead(false)
		} else {
			allReadArticles.push(slug)
			setArticleWasRead(true)
		}
		// Set new localStorage
		localStorage.setItem('readArticles', JSON.stringify(allReadArticles))
	}

	return (
		<div className={invisible ? 'hidden' : ''} onClick={() => (clickable ? toggleRead() : null)} key={`article-checker-${articleWasRead}`}>
			{articleWasRead || allArticles.includes(slug) ? (
				<button className={'text-green-600 font-bold opacity-60'}>
					<div className={'flex items-center gap-1'}>
						<span>✓</span>
						<span>Read</span>
					</div>
				</button>
			) : (
				<button className={'text-red-600 font-bold flex flex-row align-center'}>
					<div className={'flex items-center gap-1'}>
						<span className={'rounded-full inline-block w-2 h-2 bg-red-600 animate-pulse duration-300'} />
						<span>New</span>
					</div>
				</button>
			)}
		</div>
	)
}

export default ArticleChecker

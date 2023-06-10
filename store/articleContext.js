import { createContext } from 'react'

export const ArticleContext = createContext()

import { useState, useEffect } from 'react'
import { safeLocalStorage } from '@utils/safeLocalStorage' //Assuming utils.js file is in the same folder

export const ArticleProvider = ({ children }) => {
	const [readArticles, setReadArticles] = useState(() => {
		return safeLocalStorage('readArticles', [])
	})

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('readArticles', JSON.stringify(readArticles))
		}
	}, [readArticles])

	const addArticle = (slug) => {
		setReadArticles((prevArticles) => {
			if (prevArticles.includes(slug)) return prevArticles // if the slug already exists, return without adding
			return [...prevArticles, slug]
		})
	}

	return <ArticleContext.Provider value={{ readArticles, addArticle }}>{children}</ArticleContext.Provider>
}

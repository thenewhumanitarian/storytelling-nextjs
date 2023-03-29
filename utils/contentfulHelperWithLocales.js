export const callContentful = async (query) => {
	const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`
	const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

	const fetchOptions = {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	}

	try {
		const data = await fetch(fetchUrl, fetchOptions).then((response) => response.json())
		return data
	} catch (error) {
		throw new Error('Could not fetch data from Contentful!')
	}
}

import client from '@utils/contentfulClient'

export default async (req, res) => {
	const page = req.query.page || 1
	const limit = 10
	const skip = (page - 1) * limit

	try {
		const response = await client.getEntries({
			content_type: 'blogPost', // Use your actual Contentful content type ID
			limit,
			skip,
			order: '-sys.createdAt', // or any other order you prefer
		})

		res.status(200).json({ posts: response.items, total: response.total })
	} catch (error) {
		console.error(error)
		res.status(500).send('Error fetching posts from Contentful')
	}
}

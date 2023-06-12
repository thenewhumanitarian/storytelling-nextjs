const contentful = require('contentful')

const client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	// environment: '<environment_id>', // defaults to 'master' if not set
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export default client

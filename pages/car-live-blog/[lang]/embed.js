import { Helmet } from 'react-helmet'

import { callContentful } from '@utils/contentfulHelper'
import EmbeddedFeed from '@components/live-blog/embeddedFeed'

const AllLiveBlogs = ({ lang, liveBlogData }) => {
	console.log(liveBlogData, lang)

	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: lang === 'en' ? 'en-GB' : 'fr-FR',
				}}
			>
				<meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			</Helmet>
			<EmbeddedFeed lang={lang} entries={liveBlogData.contentCollection.items} />
		</div>
	)
}

export default AllLiveBlogs

export const getStaticPaths = async () => {
	return {
		paths: [], // Indicates that no page needs be created at build time
		fallback: 'blocking', // Indicates the type of fallback
	}
}

export const getStaticProps = async (ctx) => {
	let slug = 'car-blog-english'
	const lang = ctx.params.lang

	if (lang === 'fr') {
		slug = 'car-blog-french'
	}

	const query = `{
	liveBlogCollection(locale: "${lang}", limit: 1, where: { slug: "${slug}" }) {
			items {
				title
				slug
				summary {
					json
				}
				shareImage {
					url
				}
				shareText
				contentCollection {
					items {
						... on LiveBlogEntry {
							title
							slug
							summary { json }
							subtitle
							type
							date
							blogEntryAuthor {
								name
								image {
									url
								}
								description {
									json
								}
								image {
									url
								}
							}
						}
					}
				}
			}
		}
  }`

	const liveBlog = await callContentful(query)

	console.log(liveBlog)

	return {
		props: { lang, liveBlogData: liveBlog.data.liveBlogCollection.items[0] },
		revalidate: 60,
	}
}

// import Link from 'next/link'
import { Helmet } from 'react-helmet'
// import { useRouter } from 'next/router'
import Sidebar from '@components/live-blog/sidebar'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
import DynamicBlogContentComponent from '@components/live-blog/Components'
import HorizontalTimelineComponent from '@components/live-blog/timeline/horizontalTimeline'
// import { IconAudio, IconMovie } from '@components/icons/media'

const AllLiveBlogs = ({ lang, liveBlogPageData, liveBlogPages, pageContent }) => {
	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: lang || 'en-GB',
				}}
			>
				<meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			</Helmet>

			<HeaderComponent lang={lang} />

			{/* Horizontal timeline */}
			<div className={'relative w-full px-0 py-5 border-b'} style={{ borderBottom: '1px solid #ddd' }}>
				<HorizontalTimelineComponent liveBlogs={liveBlogPageData.contentCollection.items} lang={lang} />
				<div className={'absolute right-0 top-0 w-24 h-full bg-gradient-to-r from-transparent to-gray-100'} />
				{/* <p className={'text-base text-burgundy'}>[Horizontal Timeline]</p> */}
			</div>

			{/* Grid for main content */}
			<div className='flex flex-col-reverse sm:grid sm:grid-flow-col sm:grid-cols-9 gap-8 px-3 sm:px-8 mt-3 sm:mt-10 items-start'>
				<Sidebar title={liveBlogPageData.title} lang={lang} liveBlogPages={liveBlogPages} />
				<div className='grid grid-cols-1 col-span-7 gap-0 xl:col-span-5'>
					<h1>{pageContent.title}</h1>
					<div className={'grid grid-cols-1 gap-y-1 mt-8'}>
						{pageContent.blogPageContentCollection.items.map((entry, i) => {
							return <DynamicBlogContentComponent key={`blog-entry-content-${i}`} data={entry} lang={lang} />
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AllLiveBlogs

export const getStaticPaths = async () => {
	// Empty array to be filled with all the paths
	let paths = []

	// Querying all the English entries
	const queryEN = `{
		liveBlogPageCollection(locale: "en") {
			items {
				slug
			}
		}
	}
	`

	// Await English entries query response
	const pagesEN = await callContentful(queryEN)
	const slugsEN = pagesEN.data.liveBlogPageCollection.items.map((el) => el.slug)

	// Loop through slugs and add English entries to paths array
	for (let i = 0; i < slugsEN.length; i++) {
		paths.push({
			params: {
				lang: 'en',
				slug: slugsEN[i],
			}
		})
	}

	// Querying all the French entries
	const queryFR = `{
			liveBlogPageCollection(locale: "fr") {
				items {
					slug
				}
			}
		}
		`

	// Await French entries query response
	const pagesFR = await callContentful(queryFR)
	const slugsFR = pagesFR.data.liveBlogPageCollection.items.map((el) => el.slug)

	// Loop through slugs and add French entries to paths array
	for (let i = 0; i < pagesFR.length; i++) {
		paths.push({
			params: {
				lang: 'fr',
				slug: slugsFR[i],
			}
		})
	}

	return {
		// paths: [], //indicates that no page needs be created at build time
		paths: paths,
		fallback: 'blocking', //indicates the type of fallback
	}
}

export const getStaticProps = async (ctx) => {
	let { lang, slug } = ctx.params

	let blogSlug = 'car-blog-english'
	if (lang === 'fr') {
		blogSlug = 'car-blog-french'
	}

	const query = `{
	liveBlogCollection(locale: "${lang}", limit: 1, where: { slug: "${blogSlug}" }) {
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

	const pagesQuery = `{
		liveBlogPageCollection(locale: "${lang}") {
			items {
				title
				slug
			}
		}
	}`

	const liveBlogPages = await callContentful(pagesQuery)

	const pageContentQuery = `{
			liveBlogPageCollection(
				locale: "${lang}"
				limit: 1
				where: { slug: "${slug}" }
			) {
				items {
					title
					blogPageContentCollection {
						items {
							... on LiveBlogContentText {
								__typename
								title
								text {
									json
								}
							}
							... on LiveBlogContentVideo {
								__typename
								title
								youtubeId
								video {
									fileName
									url
								}
								caption {
									json
								}
								credit
							}
							... on LiveBlogContentAudio {
								__typename
								title
								youtubeId
								audio {
									fileName
									url
								}
								caption {
									json
								}
								credit
							}
							... on LiveBlogContentImageGrid {
								__typename
								imagesCollection {
									items {
										fileName
										url
										width
										height
										title
										description
									}
								}
							}
						}
					}
				}
			}
	}`

	const pageContent = await callContentful(pageContentQuery)

	return {
		props: {
			lang,
			liveBlogPageData: liveBlog.data.liveBlogCollection.items[0],
			liveBlogPages: liveBlogPages.data.liveBlogPageCollection.items,
			// pageContent: pageContent.data.liveBlogPageCollection.items[0],
			pageContent: pageContent.data.liveBlogPageCollection.items[0],
		},
		revalidate: 60,
	}
}

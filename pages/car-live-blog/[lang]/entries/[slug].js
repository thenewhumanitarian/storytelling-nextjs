import { Helmet } from 'react-helmet'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
import DynamicBlogContentComponent from '@components/live-blog/Components'
import HorizontalTimelineComponent from '@components/horizontal-timeline'
import ArticleChecker from '@components/live-blog/articleChecker'
import Sidebar from '@components/live-blog/sidebar'
import RichtextComponent from '@components/richText'
// import Feed from '@components/live-blog/feed'
// import { IconAudio, IconMovie } from '@components/icons/media'

const LiveBlogEntry = ({ liveBlogEntryCollection, liveBlogData, lang, liveBlogPages }) => {
	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: lang === 'en' ? 'en-GB' : 'fr-FR',
				}}
			>
				<meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
				{liveBlogEntryCollection.blogEntrySocialImage?.url && <meta property='og:image' content={liveBlogEntryCollection.blogEntrySocialImage.url} />}
			</Helmet>

			<HeaderComponent />

			{/* Horizontal timeline */}
			<div className={'relative w-full bg-gray-100 px-0 py-5 mt-24'}>
				<HorizontalTimelineComponent liveBlogs={liveBlogData.contentCollection.items} lang={lang} />
				<div className={'absolute right-0 top-0 w-24 h-full bg-gradient-to-r from-transparent to-gray-100'} />
				{/* <p className={'text-base text-burgundy'}>[Horizontal Timeline]</p> */}
			</div>

			{/* Grid for main content */}
			<div className='grid items-start grid-flow-col grid-cols-9 gap-8 px-8 mt-10'>
				<Sidebar title={liveBlogData.title} lang={lang} liveBlogPages={liveBlogPages} />
				<div className='relative grid grid-cols-1 col-span-7 gap-0 xl:col-span-5'>
					<h1>{liveBlogEntryCollection.title}</h1>
					<RichtextComponent content={liveBlogEntryCollection.summary.json} />
					<ArticleChecker slug={liveBlogEntryCollection.slug} setIsRead={true} showRemoveArticle className={'mt-4 pt-2 border-t'} />
					<div className={'grid grid-cols-1 gap-y-1 mt-5'}>
						{liveBlogEntryCollection.blogEntryContentCollection.items.map((entry, i) => {
							return <DynamicBlogContentComponent key={`blog-entry-content-${i}`} data={entry} lang={lang} />
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LiveBlogEntry

export const getStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
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
							date
							summary { json }
							type
							blogEntryAuthor {
								name
								slug
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
		liveBlogEntryCollection(
			locale: "${lang}"
			limit: 1
			where: { slug: "${slug}" }
		) {
			items {
				title
				date
				slug
				summary { json }
				type
				blogEntrySocialImage {
					url
				}
				blogEntryAuthor {
					name
					image {
						fileName
					}
					description {
						json
					}
				}
				blogEntryContentCollection {
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

	const liveBlogEntry = await callContentful(query)

	const pagesQuery = `{
		liveBlogPageCollection(locale: "${lang}") {
			items {
				title
				slug
			}
		}
	}`

	const liveBlogPages = await callContentful(pagesQuery)

	return {
		props: {
			lang,
			liveBlogEntryCollection: liveBlogEntry.data.liveBlogEntryCollection.items[0],
			liveBlogData: liveBlogEntry.data.liveBlogCollection.items[0],
			liveBlogPages: liveBlogPages.data.liveBlogPageCollection.items,
		},
		revalidate: 60,
	}
}

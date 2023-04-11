import Link from 'next/link'
import { Helmet } from 'react-helmet'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
import DynamicBlogContentComponent from '@components/live-blog/Components'
// import Feed from '@components/live-blog/feed'
// import { IconAudio, IconMovie } from '@components/icons/media'
// import HorizontalTimelineComponent from '@components/horizontal-timeline'

const LiveBlogEntry = ({ liveBlogEntryCollection, liveBlogData, lang }) => {
	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: lang === 'en' ? 'en-GB' : 'fr-FR',
				}}
			>
				<meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			</Helmet>

			<HeaderComponent />

			{/* Horizontal timeline */}
			<div className={'w-full bg-gray-200 px-8 py-5 mt-24'}>
				{/* <HorizontalTimelineComponent liveBlogs={liveBlogs} /> */}
				<p className={'text-base text-burgundy'}>[Horizontal Timeline]</p>
			</div>

			{/* Grid for main content */}
			<div className='grid grid-flow-col grid-cols-9 gap-8 px-8 mt-10'>
				<div className='col-span-2'>
					<Link href={'/car-live-blog/en'}>
						<button className={'bg-burgundy px-3 py-1 text-white font-bold mb-5'}>{lang === 'en' ? '← Back to overview' : '← Retour'}</button>
					</Link>
					<h2>{liveBlogData.title}</h2>
					<ul className={'list-none m-0 grid pt-2'}>
						<li>
							<Link href={'#'}>Why are we doing this</Link>
						</li>
						<li>
							<Link href={'#'}>What is it about</Link>
						</li>
						<li>
							<Link href={'#'}>Send us your feedback</Link>
						</li>
					</ul>
				</div>

				<div className='grid grid-cols-1 col-span-7 xl:col-span-5 gap-y-10'>
					<h1>{liveBlogEntryCollection.title}</h1>
					{liveBlogEntryCollection.blogEntryContentCollection.items.map((entry, i) => {
						return <DynamicBlogContentComponent key={`blog-entry-content-${i}`} data={entry} />
					})}
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
							summary
							type
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
		liveBlogEntryCollection(
			locale: "${lang}"
			limit: 1
			where: { slug: "${slug}" }
		) {
			items {
				title
				date
				slug
				summary
				type
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
							title
							__typename
							video {
								fileName
								url
							}
							caption {
								json
							}
							credit
						}
					}
				}
			}
		}
  }`

	const liveBlogEntry = await callContentful(query)

	return {
		props: {
			lang,
			liveBlogEntryCollection: liveBlogEntry.data.liveBlogEntryCollection.items[0],
			liveBlogData: liveBlogEntry.data.liveBlogCollection.items[0],
		},
		revalidate: 60,
	}
}

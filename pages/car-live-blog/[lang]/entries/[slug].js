import Link from 'next/link'
import { Helmet } from 'react-helmet'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
import DynamicBlogContentComponent from '@components/live-blog/Components'
import HorizontalTimelineComponent from '@components/horizontal-timeline'
import ArticleChecker from '@components/live-blog/articleChecker'
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
			</Helmet>

			<HeaderComponent />

			{/* Horizontal timeline */}
			<div className={'relative w-full bg-gray-100 px-0 py-5 mt-24'}>
				<HorizontalTimelineComponent liveBlogs={liveBlogData.contentCollection.items} lang={lang} />
				<div className={'absolute right-0 top-0 w-24 h-full bg-gradient-to-r from-transparent to-gray-100'} />
				{/* <p className={'text-base text-burgundy'}>[Horizontal Timeline]</p> */}
			</div>

			{/* Grid for main content */}
			<div className='grid grid-flow-col grid-cols-9 gap-8 px-8 mt-10'>
				<div className='col-span-2'>
					<Link href={`${lang === 'en' ? '/car-live-blog/en' : '/car-live-blog/fr'}`}>
						<button className={'bg-burgundy px-3 py-1 text-white font-bold mb-5'}>{lang === 'en' ? '← Back to overview' : '← Retour'}</button>
					</Link>
					<h2>{liveBlogData.title}</h2>
					<ul className={'list-none m-0 grid pt-2'}>
						{liveBlogPages.map((el, i) => {
							return (
								<li>
									<Link href={`/car-live-blog/${lang}/pages/${el.slug}`}>{el.title}</Link>
								</li>
							)
						})}
						<li className={'border-t mt-2 pt-2 border-black'}>
							<Link href={`${lang === 'en' ? `/car-live-blog/fr` : `/car-live-blog/en`}`}>
								<button
									className={
										'bg-transparent border-2 border-burgundy px-3 py-1 text-burgundy font-bold mt-2 hover:bg-burgundy hover:text-white transition-all duration-100 ease-in-out'
									}
								>
									{lang === 'en' ? 'Lire en français' : 'Read in English'}
								</button>
							</Link>
						</li>
					</ul>
				</div>

				<div className='grid grid-cols-1 col-span-7 gap-0 xl:col-span-5'>
					<ArticleChecker slug={liveBlogEntryCollection.slug} setIsRead={true} invisible={true} />
					<h1>{liveBlogEntryCollection.title}</h1>
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

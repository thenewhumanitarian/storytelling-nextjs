// import Link from 'next/link'
import { Helmet } from 'react-helmet'
// import { useRouter } from 'next/router'
import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
// import Feed from '@components/live-blog/feed'
import HorizontalTimelineComponent from '@components/horizontal-timeline'
// import { IconAudio, IconMovie } from '@components/icons/media'

const AllLiveBlogs = ({ lang, liveBlogData, liveBlogPages }) => {
	// console.log(liveBlogData, lang)

	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: lang || 'en-GB',
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

				{/* <div className='grid grid-cols-1 col-span-7 xl:col-span-7 gap-y-10'>
					<h2>Latest entries</h2>
					<Feed lang={lang} entries={liveBlogData.contentCollection.items} />
				</div> */}
			</div>
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
							summary
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

	return {
		props: { lang, liveBlogData: liveBlog.data.liveBlogCollection.items[0], liveBlogPages: liveBlogPages.data.liveBlogPageCollection.items },
		revalidate: 60,
	}
}

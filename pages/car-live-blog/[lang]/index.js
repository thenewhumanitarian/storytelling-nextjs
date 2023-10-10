import Sidebar from '@components/live-blog/sidebar'
import { Helmet } from 'react-helmet'
// import { useRouter } from 'next/router'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
import Feed from '@components/live-blog/feed'
import HorizontalTimelineComponent from '@components/live-blog/timeline/horizontalTimeline'

const AllLiveBlogs = ({ lang, liveBlogData, liveBlogPages, liveBlogAuthors }) => {
	const shareProps = {
		title: 'The New Humanitarian | Live from the CAR', // TODO
		url: 'https://vercel.thenewhumanitarian.org/car-live-blog/en', // TODO
		socialTitle: 'The New Humanitarian | Live from the CAR', // TODO
		socialDescription: 'Our journalism, impact, audience, and more.', // TODO
		socialImage: 'https://www.thenewhumanitarian.org/s3/files/styles/responsive_large_2x/public/annualreport.png?itok=Y0cc4R4Y',
		nodeId: null,
		updatedTime: '2021-06-27T08:00:00+00:00',
		modiefiedTime: '2021-06-27T08:00:00+00:00',
		publishedTime: '2021-06-27T08:00:00+00:00',
	}

	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: lang === 'en' ? 'en-GB' : 'fr-FR',
				}}
			>¨¨
				<meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			</Helmet>

			<HeaderComponent shareProps={shareProps} lang={lang} hideBackButton={true} />

			{/* Horizontal timeline */}
			<div className={'relative w-full px-0 py-5 border-b'} style={{ borderBottom: '1px solid #ddd' }}>
				<HorizontalTimelineComponent liveBlogs={liveBlogData.contentCollection.items} lang={lang} />
				<div className={'absolute right-0 top-0 w-24 h-full bg-gradient-to-r from-transparent to-gray-100'} />
				{/* <p className={'text-base text-burgundy'}>[Horizontal Timeline]</p> */}
			</div>

			{/* Grid for main content */}
			<div className='flex flex-col-reverse sm:grid sm:grid-flow-col sm:grid-cols-9 gap-8 px-3 sm:px-8 mt-3 sm:mt-10 items-start'>
				<Sidebar className={'bg-burgundy sm:bg-transparent mt-3 mb-3 sm:mb-0 p-5 sm:p-0 text-white sm:text-inherit sm:pb-0 sm:mt-0'} title={liveBlogData.title} lang={lang} liveBlogPages={liveBlogPages} showFilter={liveBlogAuthors} hideBackButton />
				<div className='mt-1 sm:mt-0 grid items-start grid-cols-1 col-span-7 xl:col-span-5 gap-y-5'>
					<h2 className={'hidden sm:block'}>Latest entries</h2>
					<Feed lang={lang} entries={liveBlogData.contentCollection.items} />
				</div>
			</div>
		</div>
	)
}

export default AllLiveBlogs

export const getStaticPaths = async () => {
	return {
		paths: ['/car-live-blog/en', '/car-live-blog/fr'],
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
							headerImage {
								url
							}
							blogEntryAuthor {
								name
								slug
								image {
									url
								}
								description {
									json
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

	const authorsQuery = `{
		liveBlogAuthorCollection {
			items {
				name
				image {
					url
				}
				sys {
					id
				}
				slug
			}
		}
	}`

	const liveBlogAuthors = await callContentful(authorsQuery)

	return {
		props: {
			lang,
			liveBlogData: liveBlog.data.liveBlogCollection.items[0],
			liveBlogPages: liveBlogPages.data.liveBlogPageCollection.items,
			liveBlogAuthors: liveBlogAuthors.data.liveBlogAuthorCollection.items,
		},
		revalidate: 60,
	}
}

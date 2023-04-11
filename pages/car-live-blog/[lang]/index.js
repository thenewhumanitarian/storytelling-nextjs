import Link from 'next/link'
import { Helmet } from 'react-helmet'
import { useRouter } from 'next/router'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
import Feed from '@components/live-blog/feed'
// import { IconAudio, IconMovie } from '@components/icons/media'
// import HorizontalTimelineComponent from '@components/horizontal-timeline'

const AllLiveBlogs = ({ lang, liveBlogData }) => {
	// console.log(liveBlogData)

	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: 'en-GB',
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
					<h2>Latest entries</h2>
					<Feed lang={lang} entries={liveBlogData.contentCollection.items} />
				</div>
			</div>
		</div>
	)
}

export default AllLiveBlogs

export const getStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: 'blocking', //indicates the type of fallback
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

	return {
		props: { lang, liveBlogData: liveBlog.data.liveBlogCollection.items[0] },
		revalidate: 60,
	}
}

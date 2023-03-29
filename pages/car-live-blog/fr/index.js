import Link from 'next/link'
import { Helmet } from 'react-helmet'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
// import HorizontalTimelineComponent from '@components/horizontal-timeline'
// import { IconAudio, IconMovie } from '@components/icons/media'
import Feed from '@components/horizontal-timeline/feed'

const AllLiveBlogs = ({ liveBlogData }) => {
	console.log(liveBlogData)

	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: 'fr',
				}}
			>
				<meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			</Helmet>

			<HeaderComponent tagline={'Le journalisme du coeur des crises'} />

			{/* Horizontal timeline */}
			<div className={'w-full mt-32 bg-gray-200 px-8 py-5'}>{/* <HorizontalTimelineComponent liveBlogs={liveBlogs} /> */}</div>

			{/* Grid for main content */}
			<div class='grid grid-cols-9 grid-flow-col gap-8 mt-14 px-8'>
				<div class='col-span-2'>
					<h2>{liveBlogData.title}</h2>
					<ul className={'list-none m-0 gap-y-3 grid py-5'}>
						<li className={'underline'}>
							<Link href={'#'}>Pourquoi fait-on ça</Link>
						</li>
						<li className={'underline'}>
							<Link href={'#'}>De quoi s'agit-il</Link>
						</li>
						<li className={'underline'}>
							<Link href={'#'}>Envoyez-nous votre feedback</Link>
						</li>
					</ul>
				</div>

				<div class='col-span-7 xl:col-span-5 grid grid-cols-1 gap-y-10'>
					<h2>Dernières entrées</h2>
					<Feed entries={liveBlogData.contentCollection.items} />
				</div>
			</div>
		</div>
	)
}

export default AllLiveBlogs

export const getStaticProps = async () => {
	const query = `{
	liveBlogCollection(locale: "fr", limit: 1, where: { slug: "car-blog-french" }) {
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
		props: { liveBlogData: liveBlog.data.liveBlogCollection.items[0] },
		revalidate: 60,
	}
}
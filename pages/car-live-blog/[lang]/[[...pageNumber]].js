import Sidebar from '@components/live-blog/sidebar'
import { Helmet } from 'react-helmet'
import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'
import HeaderComponent from '@components/common/header'
import Feed from '@components/live-blog/feed'
import HorizontalTimelineComponent from '@components/live-blog/timeline/horizontalTimeline'

const AllLiveBlogs = ({ lang, liveBlogData, liveBlogPages, liveBlogAuthors, liveBlogAllEntries, itemsPerPage, pageNumber, numberOfEntries }) => {
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

	console.log(liveBlogData)

	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: lang === 'en' ? 'en-GB' : 'fr-FR',
				}}
			>
				<meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			</Helmet>

			<HeaderComponent shareProps={shareProps} lang={lang} hideBackButton={true} />

			{/* Horizontal timeline */}
			<div className={'relative w-full px-0 py-5 border-b'} style={{ borderBottom: '1px solid #ddd' }}>
				<HorizontalTimelineComponent liveBlogs={liveBlogAllEntries.contentCollection.items} lang={lang} />
				<div className={'absolute right-0 top-0 w-24 h-full bg-gradient-to-r from-transparent to-gray-100'} />
			</div>

			{/* Grid for main content */}
			<div className='flex flex-col-reverse sm:grid sm:grid-flow-col sm:grid-cols-9 gap-8 px-3 sm:px-8 mt-3 sm:mt-10 items-start'>
				<Sidebar className={'bg-burgundy sm:bg-transparent mt-3 mb-3 sm:mb-0 p-5 sm:p-0 text-white sm:text-inherit sm:pb-0 sm:mt-0'} title={liveBlogData.title} lang={lang} liveBlogPages={liveBlogPages} showFilter={liveBlogAuthors} hideBackButton />
				<div className='mt-1 sm:mt-0 grid items-start grid-cols-1 col-span-7 xl:col-span-5 gap-y-5'>
					{/* <h2 className={'hidden sm:block'}>Latest entries</h2> */}
					<Feed lang={lang} entries={liveBlogData.contentCollection.items.filter(el => el?.date)} />
					<div className={'flex flex-row justify-between pt-5'}>
						<Link href={`/car-live-blog/${lang}/${pageNumber <= 1 ? '' : pageNumber - 1}`} className={`${pageNumber > 0 ? '' : 'opacity-0 pointer-events-none'}`}>
							{lang === 'en' ? '← Previous' : '← Précédent'}
						</Link>
						<div className={'text-gray-600'}>
							{pageNumber + 1} of {Math.ceil(numberOfEntries / itemsPerPage)}
						</div>
						<Link href={`/car-live-blog/${lang}/${pageNumber + 1}`} className={`${pageNumber < Math.ceil(numberOfEntries / itemsPerPage) - 1 ? '' : 'opacity-0 pointer-events-none'}`}>
							{lang === 'en' ? 'Next →' : 'Suivant →'}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AllLiveBlogs

export async function getStaticPaths() {
	const paths = []

	// Fetch all the entries and then divide by number of items per page
	// To get the number of pages
	// Then create an array of paths for each page

	const slugEN = 'car-blog-english'
	const slugFR = 'car-blog-french'

	const itemsPerPage = 2

	const totalQueryEN = `{
        liveBlogCollection(locale: "en", limit: 1, where: { slug: "${slugEN}" }) {
			items {
				contentCollection {
					total
                }
            }
        }
    }`

	const totalQueryFR = `{
		liveBlogCollection(locale: "fr", limit: 1, where: { slug: "${slugFR}" }) {
			items {
				contentCollection {
					total
				}
			}
		}
	}`

	const totalEntriesEN = await callContentful(totalQueryEN)
	const numberOfEntriesEN = totalEntriesEN.data.liveBlogCollection.items[0].contentCollection.total
	const numberOfPagesEN = Math.ceil(numberOfEntriesEN / itemsPerPage)

	const totalEntriesFR = await callContentful(totalQueryFR)
	const numberOfEntriesFR = totalEntriesFR.data.liveBlogCollection.items[0].contentCollection.total
	const numberOfPagesFR = Math.ceil(numberOfEntriesFR / itemsPerPage)

	// Push page zero
	paths.push({ params: { lang: 'en', pageNumber: '' } })
	paths.push({ params: { lang: 'fr', pageNumber: '' } })

	// Create a getStaticPaths path array based on the number of pages for both languages
	for (let i = 0; i < numberOfPagesEN; i++) {
		paths.push({ params: { lang: 'en', pageNumber: `${i}` } })
	}
	for (let i = 0; i < numberOfPagesFR; i++) {
		paths.push({ params: { lang: 'fr', pageNumber: `${i}` } })
	}

	return {
		paths: paths,
		fallback: 'blocking',
	}
}

export const getStaticProps = async (ctx) => {
	let slug = 'car-blog-english'
	const lang = ctx.params.lang

	if (lang === 'fr') {
		slug = 'car-blog-french'
	}

	const pageNumber = ctx.params.pageNumber ? parseInt(ctx.params.pageNumber) : 0
	const itemsPerPage = 2

	const skip = pageNumber * itemsPerPage

	const totalQuery = `{
		liveBlogCollection(locale: "${lang}", limit: 1, where: { slug: "${slug}" }) {
		items {
			contentCollection {
					total
				}
			}
		}
	} `

	const totalEntries = await callContentful(totalQuery)

	// console.log('Total entries')
	const numberOfEntries = totalEntries.data.liveBlogCollection.items[0].contentCollection.total
	// console.log(numberOfEntries)

	// console.log('Skipped items')
	// console.log(skip)

	// console.log('Items per page')
	// console.log(itemsPerPage)

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
			contentCollection(limit: ${itemsPerPage}, skip: ${skip}, order: date_DESC) {
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
} `

	const allEntriesQuery = `{
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
			contentCollection(order: date_DESC) {
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
} `

	const allEntries = await callContentful(allEntriesQuery)

	const liveBlog = await callContentful(query)

	const pagesQuery = `{
	liveBlogPageCollection(locale: "${lang}") {
			items {
			title
			slug
		}
	}
} `

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
} `

	const liveBlogAuthors = await callContentful(authorsQuery)

	return {
		props: {
			lang,
			liveBlogData: liveBlog.data.liveBlogCollection.items[0],
			liveBlogAllEntries: allEntries.data.liveBlogCollection.items[0],
			liveBlogPages: liveBlogPages.data.liveBlogPageCollection.items,
			liveBlogAuthors: liveBlogAuthors.data.liveBlogAuthorCollection.items,
			itemsPerPage,
			pageNumber,
			skip,
			numberOfEntries
		},
		revalidate: 60,
	}
}

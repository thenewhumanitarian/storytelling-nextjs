import ArticleChecker from '@components/live-blog/dynamicArticleChecker'

import Link from 'next/link'
import { Fragment } from 'react'
import { TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { IconNewsReport, IconAudio, IconMovie, IconPhotoGallery } from '@components/icons/media'
import moment from 'moment'
import ArticleChecker from '@components/live-blog/articleChecker'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Feed({ entries, lang }) {
	if (!lang) {
		lang = 'en'
	}

	const activity = entries
		.sort((a, b) => moment(b.date) - moment(a.date))
		.map((entry, i) => {
			let icon = <IconNewsReport />

			if (entry.type === 'Video') {
				icon = <IconMovie />
			}

			if (entry.type === 'Audio') {
				icon = <IconAudio />
			}

			if (entry.type === 'Photo essay') {
				icon = <IconPhotoGallery />
			}

			const dateOneDayAgo = moment(new Date()).subtract(1, 'days')
			const dateIsOld = moment(entry.date).isBefore(dateOneDayAgo)

			let datePublished = dateIsOld ? moment(entry.date).format('DD MMMM YY') : moment(entry.date).fromNow()

			return {
				id: i,
				title: entry.title,
				slug: entry.slug,
				author: { name: entry.blogEntryAuthor.name, href: '#' },
				imageUrl: entry.blogEntryAuthor.image.url,
				summary: entry.subtitle,
				date: datePublished || '',
				icon: icon,
			}
		})

	return (
		<div className='flow-root'>
			<ul
				role='list'
				className='absolute top-0 left-0 flex flex-col justify-around w-full h-full p-4 m-0 space-y-0 list-none bg-white divide-y'
			// style={{
			// 	background:
			// 		'linear-gradient(41deg, rgba(159,62,82,0.3912158613445378) 0%, rgba(255,255,255,0.5592830882352942) 21%, rgba(255,255,255,0.47805059523809523) 48%, rgba(159,62,82,0.486453956582633) 100%)',
			// }}f
			>
				{activity.slice(0, 3).map((activityItem, activityItemIdx) => (
					<li key={`${activityItem.id}-${activityItemIdx}`} className={'pt-3'}>
						<div className='relative'>
							{/* {activityItemIdx !== 2 ? <span className='absolute left-8 top-5 -ml-px h-full w-0.5 bg-gray-200' aria-hidden='true' /> : null} */}
							<div className='relative flex items-start space-x-3'>
								<div className='relative'>
									<img
										className='flex items-center justify-center object-cover w-16 h-16 bg-gray-400 ring-2 ring-transparent'
										src={activityItem.imageUrl}
										alt=''
									/>
									<span className={'absolute bottom-0 right-0 bg-white  w-6 h-6 flex justify-center items-center'}>
										<span className={'w-4 h-4 mb-3 mr-0.5 block'}>{activityItem.icon}</span>
									</span>
								</div>
								<div className='flex-1 min-w-0'>
									<div>
										<div className='flex items-center justify-between w-full gap-x-4'>
											<a href={`/car-live-blog/${lang}/entries/${activityItem.slug}`} className='font-serif text-burgundy' target="_top">
												<h3 className={'text-lg font-bold mb-0 mt-1 line-clamp-1'}>{activityItem.title}</h3>
											</a>
											{/* <span className={'block w-6 opacity-40 absolute top-0 right-0'}>{activityItem.icon}</span> */}
										</div>
										<div className={'flex flex-row items-center'}>
											<ArticleChecker slug={activityItem.slug} />
											<p className='mt-0.5 text-gray-500'>
												Posted {activityItem.date} by {activityItem.author.name}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				))}
				<li className={'cursor-pointer underline hover:text-burgundy font-bold'}>
					<Link href={'#'}>
						<p className={'text-center pt-5'}>See all entries</p>
					</Link>
				</li>
			</ul>
		</div>
	)
}

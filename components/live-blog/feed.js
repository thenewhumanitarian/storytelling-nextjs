import { Fragment } from 'react'
import { TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { IconNewsReport, IconAudio, IconMovie, IconPhotoGallery } from '@components/icons/media'
import moment from 'moment'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Feed({ entries, lang }) {
	console.log(entries)

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
				type: 'comment',
				title: entry.title,
				slug: entry.slug,
				person: { name: entry.blogEntryAuthor.name, href: '#' },
				imageUrl: entry.blogEntryAuthor.image.url,
				comment:
					'Outcomes greenwashing strategy thought partnership, citizen-centered outcomes mobilize collective impact. Gender rights best practices policymaker segmentation move the needle society. Impact, social entrepreneurship change-makers NGO systems thinking, ideate replicable ideate compassion low-hanging fruit problem-solvers innovate outcomes replicable.',
				summary: entry.summary,
				date: datePublished || '',
				icon: icon,
			}
		})

	return (
		<div className='flow-root'>
			<ul role='list' className='p-0 m-0 -mb-8 list-none'>
				{activity.map((activityItem, activityItemIdx) => (
					<li key={activityItem.id}>
						<div className='relative pb-8'>
							{activityItemIdx !== activity.length - 1 ? (
								<span className='absolute left-8 top-5 -ml-px h-full w-0.5 bg-gray-200' aria-hidden='true' />
							) : null}
							<div className='relative flex items-start space-x-3'>
								{activityItem.type === 'comment' ? (
									<>
										<div className='relative'>
											<img
												className='flex items-center justify-center object-cover w-16 h-16 bg-gray-400 rounded-full ring-8 ring-white'
												src={activityItem.imageUrl}
												alt=''
											/>
											<span className={'absolute bottom-0 right-0 bg-white rounded-full w-6 h-6 flex justify-center items-center'}>
												<span className={'w-4 h-4 mb-3 mr-0.5 block'}>{activityItem.icon}</span>
											</span>
										</div>
										<div className='flex-1 min-w-0'>
											<div>
												<div className='flex items-center justify-between w-full gap-8 gap-x-4'>
													<a href={`${lang}/entries/${activityItem.slug}`} className='font-serif text-burgundy'>
														<h3 className={'text-2xl mb-0 mt-1'}>{activityItem.title}</h3>
													</a>
													{/* <span className={'block w-6 opacity-40 absolute top-0 right-0'}>{activityItem.icon}</span> */}
												</div>
												<p className='mt-0.5 text-gray-500'>
													Posted {activityItem.date} by {activityItem.person.name}
												</p>
											</div>
											<div className='mt-2 text-black'>
												<p className={'text-base'}>{activityItem.summary}</p>
											</div>
										</div>
									</>
								) : activityItem.type === 'assignment' ? (
									<>
										<div>
											<div className='relative px-1'>
												<div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-8 ring-white'>
													<UserCircleIcon className='w-5 h-5 text-gray-500' aria-hidden='true' />
												</div>
											</div>
										</div>
										<div className='min-w-0 flex-1 py-1.5'>
											<div className='text-gray-500'>
												<a href={activityItem.person.href} className='font-medium text-gray-900'>
													<h3 className={'m-0 p-0'}>{activityItem.title}</h3>
												</a>{' '}
												assigned{' '}
												<a href={activityItem.assigned.href} className='font-medium text-gray-900'>
													{activityItem.assigned.name}
												</a>{' '}
												<span className='whitespace-nowrap'>{activityItem.date}</span>
											</div>
										</div>
									</>
								) : activityItem.type === 'tags' ? (
									<>
										<div>
											<div className='relative px-1'>
												<div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-8 ring-white'>
													<TagIcon className='w-5 h-5 text-gray-500' aria-hidden='true' />
												</div>
											</div>
										</div>
										<div className='flex-1 min-w-0 py-0'>
											<div className='leading-8 text-gray-500'>
												<span className='mr-0.5'>
													<a href={activityItem.person.href} className='font-medium text-gray-900'>
														{activityItem.title}
													</a>{' '}
													added tags
												</span>{' '}
												<span className='mr-0.5'>
													{activityItem.tags.map((tag) => (
														<Fragment key={tag.name}>
															<a
																href={tag.href}
																className='relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
															>
																<span className='absolute flex items-center justify-center flex-shrink-0'>
																	<span className={classNames(tag.color, 'h-1.5 w-1.5 rounded-full')} aria-hidden='true' />
																</span>
																<span className='ml-3 font-semibold text-gray-900'>{tag.name}</span>
															</a>{' '}
														</Fragment>
													))}
												</span>
												<span className='whitespace-nowrap'>{activityItem.date}</span>
											</div>
										</div>
									</>
								) : null}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

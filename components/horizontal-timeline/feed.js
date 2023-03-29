import { Fragment } from 'react'
import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { IconNewsReport, IconAudio, IconMovie, IconPhotoGallery } from '@components/icons/media'

// const activity = [
// 	{
// 		id: 1,
// 		type: 'comment',
// 		title: 'Deep dive gender rights big data',
// 		person: { name: 'Eduardo Benz', href: '#' },
// 		imageUrl:
// 			'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
// 		comment:
// 			'Outcomes greenwashing strategy thought partnership, citizen-centered outcomes mobilize collective impact. Gender rights best practices policymaker segmentation move the needle society. Impact, social entrepreneurship change-makers NGO systems thinking, ideate replicable ideate compassion low-hanging fruit problem-solvers innovate outcomes replicable.',
// 		date: '2h ago',
// 		icon: <IconAudio />,
// 	},
// 	{
// 		id: 2,
// 		type: 'comment',
// 		title: 'Deep dive gender rights big data',
// 		person: { name: 'Hilary Mahy', href: '#' },
// 		imageUrl: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
// 		comment:
// 			'Incubator, inspirational when inspiring revolutionary commitment venture philanthropy resilient dynamic. Low-hanging fruit relief targeted accessibility fairness dynamic. Improve the world empathetic activate, storytelling grit compelling youth justice the resistance accessibility.',
// 		date: '1d ago',
// 		icon: <IconMovie />,
// 	},
// 	{
// 		id: 3,
// 		type: 'comment',
// 		title: 'Deep dive gender rights big data',
// 		person: { name: 'Hilary Mahy', href: '#' },
// 		imageUrl: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
// 		comment:
// 			'Outcomes greenwashing strategy thought partnership, citizen-centered outcomes mobilize collective impact. Gender rights best practices policymaker segmentation move the needle society. Impact, social entrepreneurship change-makers NGO systems thinking, ideate replicable ideate compassion low-hanging fruit problem-solvers innovate outcomes replicable.',
// 		date: '3d ago',
// 		icon: <IconNewsReport />,
// 	},
// 	{
// 		id: 4,
// 		type: 'comment',
// 		title: 'Deep dive gender rights big data',
// 		person: { name: 'Jason Meyers', href: '#' },
// 		imageUrl:
// 			'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
// 		comment:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
// 		date: 'on 22 March 2023',
// 		icon: <IconPhotoGallery />,
// 	},
// ]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Feed({ entries }) {
	console.log(entries)

	const activity = entries.map((entry, i) => {
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

		return {
			id: i,
			type: 'comment',
			title: entry.title,
			person: { name: entry.blogEntryAuthor.name, href: '#' },
			imageUrl: entry.blogEntryAuthor.image.url,
			comment:
				'Outcomes greenwashing strategy thought partnership, citizen-centered outcomes mobilize collective impact. Gender rights best practices policymaker segmentation move the needle society. Impact, social entrepreneurship change-makers NGO systems thinking, ideate replicable ideate compassion low-hanging fruit problem-solvers innovate outcomes replicable.',
			summary: entry.summary,
			date: '2h ago',
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

											<span className='absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px'>
												<ChatBubbleLeftEllipsisIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
											</span>
										</div>
										<div className='flex-1 min-w-0'>
											<div>
												<div className='flex items-center justify-between w-full gap-8 text-4xl gap-x-4'>
													<a href={activityItem.person.href} className='font-serif text-burgundy'>
														{activityItem.title}
													</a>
													<span className={'block w-12'}>{activityItem.icon}</span>
												</div>
												<p className='mt-0.5 text-2xl text-gray-500'>
													Posted {activityItem.date} by {activityItem.person.name}
												</p>
											</div>
											<div className='mt-2 text-sm text-gray-700'>
												<p>{activityItem.summary}</p>
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
											<div className='text-sm text-gray-500'>
												<a href={activityItem.person.href} className='font-medium text-gray-900'>
													{activityItem.title}
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
											<div className='text-sm leading-8 text-gray-500'>
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
																className='relative inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
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

import Image from 'next/image'

import { motion, AnimatePresence } from 'framer-motion'
import Stories, { WithSeeMore } from 'ssr-react-insta-stories'

import ChevronUp from '@components/icons/chevrons'
import CloseIcon from '@components/icons/close'
import RichtextComponent from '@components/richText'

const variants = {
	enter: {
		opacity: 0,
	},
	center: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
}

const customSeeMore = {
	textAlign: 'center',
	fontSize: 14,
	bottom: 20,
	position: 'relative',
}

const SpotlightComponent = ({ content }) => {
	const { items } = content.imagesCollection

	let stories = []

	for (let i = 0; i < items.length; i++) {
		const img = items[i]

		stories.push({
			seeMoreCollapsed: ({ toggleMore, action }) => {
				if (img.link) {
					return (
						<div className={`flex items-end justify-center`}>
							<p
								className={
									'bg-opacity-90 hover:bg-opacity-100 text-sm sm:text-base relative text-gray-50 bg-burgundy shadow mb-2 py-1 px-3 cursor-pointer'
								}
								onClick={() => {
									window.top.location.href = img.link
								}}
							>
								Read more →
							</p>
						</div>
					)
				}
				if (img.readMore?.json) {
					return (
						<div className={`flex items-end justify-center`}>
							<p
								className={
									'flex items-center justify-center bg-opacity-90 hover:bg-opacity-100 text-sm sm:text-base relative text-gray-50 bg-burgundy shadow mb-2 py-1 px-3 cursor-pointer'
								}
								onClick={() => {
									action('pause')
									toggleMore(true)
								}}
							>
								See more{' '}
								<span className={'w-6 block'}>
									<ChevronUp />
								</span>
							</p>
						</div>
					)
				}
				return false
			},
			seeMore: ({ close }) => (
				<div className={'bg-gray-50 text-gray-800 max-w-full w-full h-full p-6 absolute top-0 left-0'}>
					<div onClick={close} className={'absolute top-2 right-2 w-6 h-6 text-burgundy rounded-full cursor-pointer'}>
						<CloseIcon />
					</div>
					{img.readMore?.json && <RichtextComponent content={img.readMore.json} />}
				</div>
			),
			content: ({ action, story }) => {
				setTimeout(() => {
					// action('play')
				}, 800)
				let nextImage = i + 1
				if (nextImage >= items.length) {
					nextImage = 0
				}
				return (
					<WithSeeMore story={story} action={action}>
						<motion.div
							key={img.sys.id}
							variants={variants}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{
								opacity: { duration: 1 },
							}}
							className={'w-full h-full m-0 p-0 flex '}
						>
							<div className={'absolute top-0 left-0 opacity-0'}>
								<Image
									className={'absolute top-0 left-0'}
									width={items[nextImage].image.width}
									height={items[nextImage].image.height}
									priority
									loading={'eager'}
									placeholder={'blur'}
									src={items[nextImage].image.url}
									alt={items[nextImage].image.description || 'No alt text found'}
								/>
							</div>
							<Image
								width={img.image.width}
								height={img.image.height}
								priority
								loading={'eager'}
								placeholder={'blur'}
								src={img.image.url}
								alt={img.image.description || 'No alt text found'}
							/>
							{/* Adds mouseover for showing it goes left and right... */}
							<div className={'opacity-0 hover:opacity-100 absolute top-0 left-0 w-1/2 bg-gradient-to-r from-gray-800 to-transparent h-full'} />
							<div className={'opacity-0 hover:opacity-100 absolute top-0 left-1/2 w-1/2 bg-gradient-to-l from-gray-800 to-transparent h-full'} />
						</motion.div>
					</WithSeeMore>
				)
			},
			duration: img.duration || 5000,
		})
	}

	return (
		<div>
			<AnimatePresence initial>
				<Stories stories={stories} width={'100%'} height={'100%'} loop />
			</AnimatePresence>
		</div>
	)
}

export default SpotlightComponent

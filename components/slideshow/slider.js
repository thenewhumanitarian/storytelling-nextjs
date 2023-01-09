import * as React from 'react'
import { useState, useEffect } from 'react'

import { withUserAgent } from 'next-useragent'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion'

import RichtextComponent from '@components/richText'
import { ArrowLeft, ArrowRight } from '@components/icons/arrows'

import SlideshowImage from '@components/slideshow/image'
import VideoPlayer from '@components/slideshow/video'
import IframeComponent from '@components/slideshow/iframe'

const variants = {
	enter: (direction) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			// opacity: 0,
		}
	},
	center: {
		x: 0,
		// opacity: 1,
	},
	exit: (direction) => {
		return {
			x: direction < 0 ? 1000 : -1000,
			// opacity: 0,
		}
	},
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
	return Math.abs(offset) * velocity
}

const SliderComponent = ({ elements, ua }) => {
	const [[page, direction], setPage] = useState([0, 0])
	const imageIndex = wrap(0, elements.length, page)

	const [isInIframe, setIsInIframe] = useState(false)
	const [iframeHeight, setIframeHeight] = useState((100 / 16) * 9)

	useEffect(() => {
		if (window !== window.parent) {
			setIsInIframe(true)
			console.log('Is in iframe!')
		} else {
			console.log('Is not in iframe!')
		}
	}, [])

	useEffect(() => {
		if (elements[imageIndex].iframeHeight || elements.iframeHeightMobile) {
			if (ua.isMobile) {
				setIframeHeight(elements[imageIndex].iframeHeightMobile)
			} else {
				setIframeHeight(elements[imageIndex].iframeHeight)
			}
		} else if (elements[imageIndex].videoHeight) {
			setIframeHeight((elements[imageIndex].video?.height / elements[imageIndex].video?.width) * 100)
		} else {
			setIframeHeight((elements[imageIndex].image?.height / elements[imageIndex].image?.width) * 100)
		}
	}, [ua, imageIndex])

	const paginate = (newDirection) => {
		setPage([page + newDirection, newDirection])
	}

	const spring = {
		type: 'spring',
		damping: 30,
		// mass: 1,
		stiffness: 300,
	}

	let nextImageIndex = imageIndex + 1
	if (nextImageIndex >= elements.length) {
		nextImageIndex = 0
	}

	return (
		<div className={'bg-transparent'}>
			{elements.length > 1 && !isInIframe && (
				<div className={`flex sm:hidden justify-around items-center h-8 bg-gray-100 text-gray-700 text-sm dark:bg-gray-800 dark:text-gray-50`}>
					<span className={'cursor-pointer'} onClick={() => paginate(-1)}>
						←
					</span>
					<span>Swipe or click to see more</span>
					<span className={'cursor-pointer'} onClick={() => paginate(1)}>
						→
					</span>
				</div>
			)}
			<AnimatePresence initial={false} custom={direction}>
				<motion.div
					key={page}
					custom={direction}
					variants={variants}
					initial='enter'
					animate='center'
					exit='exit'
					transition={{
						x: spring,
						opacity: { duration: 0.6 },
					}}
					drag={elements.length > 1 ? 'x' : null}
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					// onClick={isMobile ? () : paginate(1)}
					onDragEnd={(e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x)
						if (swipe < -swipeConfidenceThreshold) {
							paginate(1)
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1)
						}
					}}
					className={`${isInIframe ? '' : 'top-8'} sm:top-0 w-full absolute cursor-default flex flex-col flex-1`}
					data-iframe-height={true}
					style={{
						backgroundColor: isInIframe ? '#282828' : 'transparent',
					}}
				>
					<div
						className={'relative w-full overflow-hidden m-0 p-0'}
						style={{
							height: 0,
							width: '100%',
							paddingTop: `${iframeHeight || (100 / 16) * 9}%`,
						}}
					>
						{elements[imageIndex].image && elements[imageIndex].image.url.indexOf('video') < 0 && (
							<SlideshowImage el={elements[imageIndex]} nextEl={elements[nextImageIndex].image?.url ? elements[nextImageIndex] : null} />
						)}

						{elements[imageIndex].image && elements[imageIndex].image.url.indexOf('video') >= 0 && <VideoPlayer el={elements[imageIndex]} />}

						{elements[imageIndex].video && <VideoPlayer el={elements[imageIndex]} />}

						{elements[imageIndex].videoUrl && <VideoPlayer el={elements[imageIndex]} />}

						{elements[imageIndex].mediaUrl && <VideoPlayer el={elements[imageIndex]} />}

						{elements[imageIndex].iframeUrl && <IframeComponent el={elements[imageIndex]} />}

						{elements.length > 1 && (
							<>
								<div className={'absolute text-white top-1/2 -mt-5 left-0 hidden sm:block z-50'}>
									<div className='prev' onClick={() => paginate(-1)}>
										<ArrowLeft className={'w-10 h-10 bg-white bg-opacity-50 p-1 cursor-pointer -ml-1 hover:bg-opacity-60'} />
									</div>
								</div>
								<div className={'absolute text-white top-1/2 -mt-5 right-0 hidden sm:block z-50'}>
									<div className='next' onClick={() => paginate(1)}>
										<ArrowRight className={'w-10 h-10 bg-white bg-opacity-50 p-1 cursor-pointer -mr-1'} />
									</div>
								</div>
							</>
						)}

						{elements.length > 1 && isInIframe && (
							<>
								<div className={'absolute text-white top-1/2 -mt-5 left-0 z-50'}>
									<div className='prev' onClick={() => paginate(-1)}>
										<ArrowLeft className={'w-10 h-10 bg-white bg-opacity-50 p-1 cursor-pointer -ml-1 hover:bg-opacity-60'} />
									</div>
								</div>
								<div className={'absolute text-white top-1/2 -mt-5 right-0 z-50'}>
									<div className='next' onClick={() => paginate(1)}>
										<ArrowRight className={'w-10 h-10 bg-white bg-opacity-50 p-1 cursor-pointer -mr-1'} />
									</div>
								</div>
							</>
						)}

						{elements[imageIndex].credit && (
							<div className={'absolute text-xs bottom-0 left-0 text-black py-1 px-2 bg-white bg-opacity-60 hover:bg-opacity-100 transition-all duration-300'}>
								{elements[imageIndex].credit}
							</div>
						)}
					</div>
					{elements[imageIndex].caption && (
						<div className={'py-2 px-3 bg-gray-100'}>
							<RichtextComponent content={elements[imageIndex].caption?.json} />
						</div>
					)}
					{elements[imageIndex].text && (
						<div className={'py-2 px-3 bg-gray-100'}>
							<RichtextComponent content={elements[imageIndex].text?.json} />
						</div>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default withUserAgent(SliderComponent)

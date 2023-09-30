import { useEffect, useState } from 'react'

import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { motion, useAnimation, AnimatePresence } from 'framer-motion'

const TimeMachineComponent = ({ chosenStory, restOfStories, slug }) => {
	const [isHover, setIsHover] = useState(false)
	const [hasClicked, setHasClicked] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [currentStory, setCurrentStory] = useState(chosenStory)

	const controls = useAnimation()
	const [isAnimating, setIsAnimating] = useState(false)

	const router = useRouter()

	console.log(chosenStory.sys.id)
	console.log(currentStory.sys.id)

	// useEffect(() => {
	// 	if (currentStory?.image?.url) {
	// 		const preloadImage = new Image()
	// 		// preloadImage.src = currentStory.image.url
	// 	}
	// }, [currentStory])

	// useEffect(() => {
	// 	setHasClicked(false)
	// }, [chosenStory])

	useEffect(() => {
		// 1. Using the window object for screen width
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setIsMobile(true)
			} else {
				setIsMobile(false)
			}
		}

		// Initially set the value on component mount
		handleResize()

		// Update on window resize
		window.addEventListener('resize', handleResize)

		// 2. Using the user agent
		const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent
		const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))

		if (mobile) setIsMobile(true)

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const handleTransition = async (nextUrl) => {
		if (isMobile && !isHover) {
			setIsHover(true)
			return
		}

		setIsAnimating(true)
		setHasClicked(true)

		router.prefetch(`/time-machine/${slug}/${nextUrl}`)

		// Trigger the animation
		await controls
			.start({
				scale: 8, // "explode" effect
				opacity: 1, // fade out
				transition: { duration: 0.5 },
			})
			.then(() => {
				setIsHover(false)
				
				setIsAnimating(false)
				setHasClicked(false)
				
				// Navigate after animation completes
				router.push(`/time-machine/${slug}/${nextUrl}`)
			})
	}

	const spring = isHover ? { type: 'spring', stiffness: 500, damping: 30 } : { type: 'linear', duration: 0.25, delay: 0.25 }

	const breatheAnimation = isHover
		? {
				scale: [1, 1.1, 1],
				opacity: [0.8, 1, 0.8],
				/* rotate: [0, 2, -2, 0], */
				transition: { duration: 3, repeat: Infinity },
		  }
		: {
				opacity: 1,
				scale: 1,
				delay: 2,
				duration: 2,
		  }

	useEffect(() => {
		let timer
		let usedIndices = [] // To keep track of used stories

		const shuffleStories = () => {
			if (restOfStories.length === 0) return

			let randomIndex

			// Ensure not selecting same story repeatedly
			do {
				randomIndex = Math.floor(Math.random() * restOfStories.length)
			} while (usedIndices.includes(randomIndex))

			setCurrentStory(restOfStories[randomIndex])

			// Track the used index
			usedIndices.push(randomIndex)

			// Clear used indices if all stories have been shown
			if (usedIndices.length === restOfStories.length) {
				usedIndices = []
			}

			timer = setTimeout(shuffleStories, 500)
		}

		if (isHover && !isAnimating) {
			shuffleStories()
		}

		return () => {
			clearTimeout(timer)
		}
	}, [isHover, isAnimating])

	return (
		<div className={'relative h-screen h-screen-ios w-screen flex items-center justify-center bg-black'}>
			<motion.div initial={{ opacity: 1, scale: 1 }} animate={{ scale: 1, opacity: hasClicked ? 0.5 : isHover && !isMobile ? 0.5 : 1 }}>
				<Image
					// src={hasClicked ? currentStory.image.url : chosenStory.image.url}
					src={chosenStory.image.url}
					// blurDataURL={`${hasClicked ? currentStory.image.url : chosenStory.image.url}?w=20&q=50`}
					blurDataURL={`${chosenStory.image.url}?w=20&q=50`}
					placeholder='blur'
					alt={currentStory.image.description || 'Time Machine Story Image'} // Use the description as the alt text or provide a default.
					layout='fill'
					objectFit='cover' // This will ensure the image covers the entire viewport without distortion.
				/>
			</motion.div>
			<motion.div
				onHoverStart={() => setIsHover(true)}
				onHoverEnd={() => setIsHover(false)}
				onTapStart={() => handleTransition(currentStory.slug)}
				// onTapCancel={() => setIsHover(false)}
				// onTapEnd={() => handleTransition(currentStory.slug)}
				animate={breatheAnimation}
				initial={{ scale: 0, opacity: 0 }}
				transition={spring}
				className={`relative z-50 w-56 h-56 border-8 rounded-full shadow-xl cursor-pointer border-burgundy sm:w-80 sm:h-80 user-select-none transition-all ${
					hasClicked && 'border-none opacity-0'
				}`}
			>
				{isHover ? (
					<div
						className={`absolute flex flex-col items-center justify-center w-full h-full bg-white rounded-full bg-opacity-80 user-select-none transition-opacity ${
							hasClicked ? 'opacity-0' : 'opacity-100'
						}`}
						onClick={() => handleTransition(currentStory.slug)}
					>
						<motion.div animate={controls} className='relative top-0 left-0 w-full h-full overflow-hidden bg-transparent rounded-full'>
							{currentStory && (
								<motion.div animate={{ opacity: hasClicked ? 0 : 1 }} initial={{ opacity: 0 }} className={'user-select-none'}>
									<Image
										src={currentStory.image.url}
										className={`absolute top-0 left-0 w-full h-full bg-cover object-cover pointer-events-none user-select-none transition-opacity ${
											hasClicked ? 'opacity-0' : 'opacity-100'
										}`}
										alt={currentStory.image.description || 'Story image'}
										layout='fill'
										placeholder='blur'
										blurDataURL={`${currentStory.image.url}?w=20&q=50`} // Replace with a low-res or base64 version for actual blur-up effect
										// width={currentStory.image.width}
										// height={currentStory.image.height}
									/>
								</motion.div>
							)}
						</motion.div>
						<h2 className={'absolute font-bold text-base text-center z-10 text-white sm:text-xl'}>Click to read more...</h2>
					</div>
				) : (
					<div
						className={`absolute flex flex-col items-center justify-center w-full h-full bg-white rounded-full user-select-none ${
							hasClicked ? 'bg-opacity-100' : 'bg-opacity-50'
						}`}
					>
						<h2 className={'font-bold text-xl sm:text-3xl text-center'}>Explore stories</h2>
						<p className={'hidden sm:block'}>Move your mouse over this circle...</p>
						<p className={'block sm:hidden'}>Tap once to shuffle...</p>
					</div>
				)}
			</motion.div>
			<AnimatePresence>
				{!isHover && (
					<motion.div
						transition={{ type: 'linear', delay: 0.25, duration: 0.25 }}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						className={'absolute bottom-0 left-0 w-full h-30 bg-white bg-opacity-90 p-4 z-50'}
					>
						<div>
							<h2 className={'text-base md:text-3xl font-normal line-clamp-1 mb-0'}>{currentStory?.title}</h2>
							<p className={'text-base sm:text-lg line-clamp-1 sm:line-clamp-2'}>{currentStory?.description}</p>
						</div>
						<div className={'flex flex-row justify-end items-center'}>
							<Link target={'_blank'} href={currentStory?.link}>
								<button className={'bg-burgundy font-bold text-white px-3 py-1 mt-4 text-base md:text-xl'}>Read more →</button>
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default TimeMachineComponent

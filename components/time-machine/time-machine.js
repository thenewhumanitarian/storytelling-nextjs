import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/router'
import Link from 'next/link'

import { motion, useAnimation, AnimatePresence } from 'framer-motion'

const TimeMachineComponent = ({ chosenStory, restOfStories, slug }) => {
	const [isHover, setIsHover] = useState(false)
	const [currentStory, setCurrentStory] = useState(chosenStory)

	const controls = useAnimation()
	const [isAnimating, setIsAnimating] = useState(false)

	const router = useRouter()

	const handleTransition = async (nextUrl) => {
		setIsAnimating(true)

		// Trigger the animation
		await controls.start({
			scale: 5, // "explode" effect
			opacity: 1, // fade out
			transition: { duration: 0.5 },
		})

		setIsHover(false)
		
		// Navigate after animation completes
		router.push(`/time-machine/${slug}/${nextUrl}`)
		
		setIsAnimating(false)
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
		<div className={'relative h-screen w-screen flex items-center justify-center'}>
			<motion.div initial={{ opacity: 0, scale: 2 }} animate={{ scale: 1, opacity: isAnimating ? 0 : isHover ? 0.5 : 1 }}>
				<Image
					src={chosenStory.image.url}
					alt={chosenStory.image.description || 'Time Machine Story Image'} // Use the description as the alt text or provide a default.
					layout='fill'
					objectFit='cover' // This will ensure the image covers the entire viewport without distortion.
				/>
			</motion.div>
			<motion.div
				onHoverStart={() => setIsHover(true)}
				onHoverEnd={() => setIsHover(false)}
				animate={breatheAnimation}
				initial={{ scale: 0, opacity: 0 }}
				transition={spring}
				class='relative rounded-full w-80 h-80 border-8 border-white z-50 cursor-pointer'
			>
				{isHover ? (
					<div
						class='absolute flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-50 rounded-full'
						onClick={() => handleTransition(currentStory.slug)}
					>
						<motion.div animate={controls} className='relative top-0 left-0 w-full h-full overflow-hidden bg-transparent rounded-full'>
							{currentStory && (
								<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
									<Image
										src={currentStory.image.url}
										className={'absolute top-0 left-0 w-full h-full bg-cover object-cover pointer-events-none'}
										alt={currentStory.image.description || 'Story Image'}
										// width={currentStory.image.width}
										// height={currentStory.image.height}
										layout='fill'
										placeholder='blur'
										blurDataURL={currentStory.image.url} // Replace with a low-res or base64 version for actual blur-up effect
									/>
								</motion.div>
							)}
						</motion.div>
						<h2 className={'absolute font-bold text-2xl text-center z-10 text-white text-xl'}>Click to read more...</h2>
					</div>
				) : (
					<div class='absolute flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-50 rounded-full'>
						<h2 className={'font-bold text-3xl text-center'}>Explore stories</h2>
						<p>Move your mouse over this circle...</p>
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
						className={'absolute bottom-0 left-0 w-full h-30 bg-white bg-opacity-80 p-4'}
					>
						<div>
							<h2 className={'font-bold line-clamp-1'}>{currentStory?.title}</h2>
							<p className={'line-clamp-2'}>{currentStory?.description}</p>
						</div>
						<div className={'flex flex-row justify-end items-center'}>
							{/* <Link target={'_blank'} href={currentStory?.link}> */}
							<button className={'bg-burgundy font-bold text-white px-3 py-1 mt-4 text-base'}>Read more →</button>
							{/* </Link> */}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default TimeMachineComponent

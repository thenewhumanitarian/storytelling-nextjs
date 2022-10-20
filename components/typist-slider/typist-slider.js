// import { Suspense } from 'react'
import { useState } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

import { motion, AnimatePresence } from 'framer-motion'

import 'react-typist/dist/Typist.css'

const Typist = dynamic(() => import('react-typist'), {
	suspense: true,
})

const TypistElement = ({ item }) => {
	return (
		<>
			<Typist
				cursor={{
					show: true,
					blink: true,
					element: '|',
					hideWhenDone: false,
					hideWhenDoneDelay: 0,
				}}
			>
				<h3 className={'inline absolute top-0 left-0 text-3xl'}>{item.quote}</h3>
			</Typist>
			<h3 className={'inline-block absolute top-0 left-0 opacity-25 text-burgundy text-3xl'}>{item.quote}</h3>
			<h3 className={'inline opacity-0 text-3xl'}>{item.quote}</h3>
			<div className={'text-center'}>
				<Link href={item.link}>
					<a target={'_top'}>
						Read more{' '}
						<span className={'inline-block w-4 h-4'}>
							<ArrowDownIcon />
						</span>
					</a>
				</Link>
			</div>
		</>
	)
}

const HeadElement = ({ item, onClick, isCurrent, className }) => {
	const url = item.image.url

	return (
		<motion.div
			onClick={() => (onClick ? onClick() : null || undefined)}
			className={`flex flex-col items-center justify-start cursor-pointer ${className}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: isCurrent ? 1 : 0.3 }}
		>
			<motion.div className={'relative w-full pt-full rounded-full overflow-hidden'}>
				<Image
					className={'w-full h-full object-cover absolute top-0 left-0'}
					layout={'fill'}
					placeholder={'blur'}
					blurDataURL={`${url}?w=8`}
					src={item.image.url}
					alt={item.image.description || 'No alt text found'}
				/>
			</motion.div>
			<h2 className={'text-center mt-4'}>{item.name}</h2>
		</motion.div>
	)
}

const TypistSliderComponent = ({ content }) => {
	const [currentSlide, setCurrentSlide] = useState(0)

	const changeSlide = (i) => {
		console.log(i)
		setCurrentSlide(i)
	}

	return (
		<div className={'relative'}>
			<div className={'grid grid-cols-1 sm:grid-cols-3 gap-x-10 justify-start'} key={`wrapper-${currentSlide}`}>
				<HeadElement
					className={'hidden sm:flex'}
					key={`prev-head-${currentSlide}`}
					onClick={() => changeSlide(currentSlide - 1 < 0 ? content.length - 1 : currentSlide - 1)}
					item={currentSlide - 1 < 0 ? content[content.length - 1] : content[currentSlide - 1]}
				/>
				<HeadElement
					className={'p-4 sm:p-0'}
					isCurrent
					key={`current-head-${currentSlide}`}
					onClick={() => changeSlide(currentSlide)}
					item={content[currentSlide]}
				/>
				<HeadElement
					className={'hidden sm:flex'}
					key={`next-head-${currentSlide}`}
					onClick={() => changeSlide(currentSlide + 1 >= content.length ? 0 : currentSlide + 1)}
					item={currentSlide + 1 >= content.length ? content[0] : content[currentSlide + 1]}
				/>
			</div>
			<div className={'flex justify-between w-full py-6'}>
				<button className={'w-8 h-8'} onClick={() => changeSlide(currentSlide + 1 >= content.length ? 0 : currentSlide + 1)}>
					<ArrowLeftIcon />
				</button>
				<button className={'w-8 h-8'} onClick={() => changeSlide(currentSlide + 1 >= content.length ? 0 : currentSlide + 1)}>
					<ArrowRightIcon />
				</button>
			</div>
			<motion.div className={'relative'}>
				<TypistElement key={`typist-${currentSlide}`} item={content[currentSlide]} />
			</motion.div>
		</div>
	)
}

export default TypistSliderComponent

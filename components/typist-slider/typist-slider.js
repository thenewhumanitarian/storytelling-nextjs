// import { Suspense } from 'react'
import { useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { motion, AnimatePresence } from 'framer-motion'

import 'react-typist/dist/Typist.css'

const Typist = dynamic(() => import('react-typist'), {
	suspense: true,
})

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
		</>
	)
}

const HeadElement = ({ item, onClick }) => {
	return (
		<motion.div onClick={() => onClick()} className={'flex items-center justify-center'}>
			{item.name}
		</motion.div>
	)
}

const TypistSliderComponent = ({ content }) => {
	console.log(content)

	const [currentSlide, setCurrentSlide] = useState(0)

	const changeSlide = (i) => {
		if (i === currentSlide) {
			return
		}
		setCurrentSlide(i)
	}

	return (
		<div>
			<div className={'flex justify-between w-full'}></div>
			<AnimatePresence initial>
				<TypistElement key={`typist-${currentSlide}`} item={content[currentSlide]} />
				<div className={'grid grid-cols-3'}>
					<HeadElement
						onClick={() => changeSlide(currentSlide - 1 < 0 ? content.length - 1 : currentSlide - 1)}
						item={currentSlide - 1 < 0 ? content[content.length - 1] : content[currentSlide - 1]}
					/>
					<HeadElement item={content[currentSlide]} />
					<HeadElement
						onClick={() => changeSlide(currentSlide + 1 >= content.length ? 0 : currentSlide + 1)}
						item={currentSlide + 1 >= content.length ? content[0] : content[currentSlide + 1]}
					/>
				</div>
			</AnimatePresence>
		</div>
	)
}

export default TypistSliderComponent

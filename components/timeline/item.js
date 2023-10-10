import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import RichtextComponent from '@components/richText'
import { ChevronDown, ChevronRight } from '@components/icons/chevrons'
// import CalendarIcon, { BulletIcon, ListIcon } from '@components/icons/timeline'
import CalendarIcon from '@components/icons/timeline'

const TimelineItem = ({ data }) => {
	const { title, text, openByDefault } = data

	const [isOpen, setIsOpen] = useState(openByDefault)

	return (
		<div className={'mb-8'}>
			<div className={'flex flex-row items-center justify-start relative cursor-pointer'}>
				{title && (
					<h3 className={'text-burgundy font-bold text-xl sm:text-2xl'} onClick={() => setIsOpen(!isOpen)}>
						{title}
					</h3>
				)}
				<span className={'flex items-center justify-center flex-row text-burgundy w-3 h-3 pb-2 ml-2'}>
					{isOpen ? <ChevronDown /> : <ChevronRight />}
				</span>
				<div
					className={
						'absolute flex justify-center items-center -left-14 rounded-full w-12 h-12 border-2 border-gray-200 bg-gray-100 p-3 text-gray-500'
					}
				>
					<CalendarIcon />
				</div>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						<div className={'px-2'}>
							<RichtextComponent content={text} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default TimelineItem

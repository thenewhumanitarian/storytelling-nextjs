import Image from 'next/image'

import { motion } from 'framer-motion'

import RichtextComponent from '@components/richText'

const ThingLinkComponent = ({ thinglink }) => {
	console.log(thinglink)

	return (
		<div>
			<Image
				src={thinglink.baseImage.url}
				width={thinglink.baseImage.width}
				height={thinglink.baseImage.height}
				alt="Picture of the author"
			/>
			<div className={'absolute top-0 left-0 w-full h-full'}>
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					whileHover={{ scale: 1.1 }}
					className={'cursor-pointer absolute top-20 left-20 bg-red-500 w-20 h-20 z-50 rounded-full shadow-2xl border-white border-4'}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 20,
					}}
				/>
			</div>
		</div>
	)
}

export default ThingLinkComponent

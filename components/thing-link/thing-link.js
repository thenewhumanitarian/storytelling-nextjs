import { useEffect } from 'react'

import Image from 'next/legacy/image'

import ThingLinkButton from './thing-link-button'
import RichtextComponent from '@components/richText'

const ThingLinkComponent = ({ thinglink }) => {
	const buttons = thinglink.buttonsCollection.items

	useEffect(() => {
		// Select body and set overflow to hidden
		const body = document.querySelector('body')
		body.style.overflow = 'hidden'
	}, [])

	return (
		<div className={'w-full h-full relative'}>
			<Image
				src={thinglink.baseImage.url}
				width={thinglink.baseImage.width}
				height={thinglink.baseImage.height}
				alt="Picture of the author"
				layout={'responsive'}
			/>
			<div className={'absolute top-0 left-0 w-full h-full'}>
				{buttons.map((button) => {
					return (
						<ThingLinkButton data={button} />
					)
				})}
			</div>
			{thinglink.caption?.json && (
				<div className={'py-2 px-3 bg-gray-100'}>
					<RichtextComponent content={thinglink.caption?.json} />
				</div>
			)}
		</div>
	)
}

export default ThingLinkComponent

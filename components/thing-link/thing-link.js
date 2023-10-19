import Image from 'next/image'

import ThingLinkButton from './thing-link-button'

const ThingLinkComponent = ({ thinglink }) => {
	const buttons = thinglink.buttonsCollection.items
	console.log(buttons)

	return (
		<div className={'w-full h-full overflow-hidden relative'}>
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
		</div>
	)
}

export default ThingLinkComponent

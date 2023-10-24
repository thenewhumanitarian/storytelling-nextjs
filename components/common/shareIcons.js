import React, { useState } from 'react'

import { isMobile } from 'react-device-detect'
import { motion, LayoutGroup } from 'framer-motion'

const TwitterIcon = ({ text, url, inverted }) => {
	return (
		<a
			target={'_blank'}
			rel={'noopener noreferrer'}
			href={`https://twitter.com/intent/tweet?text=${text}:%20${url}%20(@newhumanitarian)`}
			className={'hover:bg-transparent focus:bg-transparent'}
		>
			<svg xmlns='http://www.w3.org/2000/svg' width='17' height='14' viewBox='0 0 17 14' className={'hidden sm:inline-block ml-3 mr-4'}>
				<g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
					<g fill={inverted ? '#fff' : '#282828'} fillRule='nonzero' transform='translate(0 -1)'>
						<path d='M5.14 15a9.48 9.48 0 009.54-9.54v-.43a6.91 6.91 0 001.67-1.74 6.57 6.57 0 01-1.93.53A3.32 3.32 0 0015.89 2a6.86 6.86 0 01-2.13.81A3.35 3.35 0 008 5.07c0 .26.03.518.09.77a9.51 9.51 0 01-6.95-3.51 3.35 3.35 0 001 4.48 3.38 3.38 0 01-1.48-.42 3.35 3.35 0 002.69 3.33 3.3 3.3 0 01-1.52.06A3.37 3.37 0 005 12.11a6.75 6.75 0 01-4.2 1.43 7 7 0 01-.8 0A9.48 9.48 0 005.14 15'></path>
					</g>
				</g>
			</svg>
		</a>
	)
}

const FacebookIcon = ({ text, url, inverted }) => {
	return (
		<a
			target={'_blank'}
			rel={'noopener noreferrer'}
			href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
			className={'hover:bg-transparent focus:bg-transparent'}
		>
			<svg xmlns='http://www.w3.org/2000/svg' width='7' height='15' viewBox='0 0 7 15' className={'inline-block mr-4 sm:mr-4'}>
				<g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
					<g fill={inverted ? '#fff' : '#282828'} fillRule='nonzero' transform='translate(-53)'>
						<path d='M54.48 2.91V5H53v2.49h1.52V15h3.1V7.5h2.09s.15-1.22.29-2.5h-2.4V3.23a.73.73 0 01.67-.6H60V0h-2.3c-3.26 0-3.18 2.53-3.18 2.91h-.04z'></path>
					</g>
				</g>
			</svg>
		</a>
	)
}

const WhatsappIcon = ({ text, url, inverted }) => {
	return (
		<a target={'_blank'} rel={'noopener noreferrer'} href={`whatsapp://send?text=${text}: ${url}`} className={'hover:bg-transparent focus:bg-transparent'}>
			<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 20 20' className={'inline-block mr-2 sm:mr-4'}>
				<g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
					<g fill={inverted ? '#fff' : '#282828'} transform='translate(-247 -1123)'>
						<g transform='translate(247 1123)'>
							<g>
								<path
									fillRule='nonzero'
									d='M17.078 2.928A9.928 9.928 0 0010.01 0C4.505 0 .024 4.479.022 9.985a9.962 9.962 0 001.333 4.992L0 20l5.233-1.237a9.981 9.981 0 004.773 1.216h.004c5.506 0 9.987-4.48 9.99-9.985a9.921 9.921 0 00-2.922-7.066zm-2.18 10.626c-.207.583-1.226 1.145-1.684 1.186-.458.042-.887.207-2.995-.624-2.538-1-4.14-3.601-4.264-3.767-.125-.167-1.019-1.353-1.019-2.581s.645-1.832.874-2.081a.916.916 0 01.666-.312c.166 0 .333 0 .478.006.178.007.375.016.562.431.222.494.707 1.728.77 1.853.061.125.103.271.02.437-.083.166-.125.27-.249.416-.125.146-.262.325-.374.437-.125.124-.255.26-.11.509.146.25.646 1.067 1.388 1.728.954.85 1.758 1.113 2.008 1.239.25.125.395.104.54-.063.147-.166.625-.728.79-.978.167-.25.334-.208.563-.125.229.083 1.456.687 1.705.812.25.125.416.187.478.291.062.103.062.603-.146 1.186z'
								></path>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</a>
	)
}

const MailIcon = ({ text, url, inverted }) => {
	return (
		<a target={'_blank'} rel={'noopener noreferrer'} href={`mailto:?subject=${text}&body=${url}`} className={'hover:bg-transparent focus:bg-transparent'}>
			<svg
				x='0'
				y='0'
				width={20}
				height={20}
				enableBackground='new 0 0 100 100'
				version='1.1'
				viewBox='0 0 100 100'
				xmlSpace='preserve'
				className={'inline-block mr-2 sm:mr-4'}
			>
				<path
					d='M8 971.4c-2.2 0-4 1.8-4 4v54c0 2.2 1.8 4 4 4h84c2.2 0 4-1.8 4-4v-54c0-2.2-1.8-4-4-4H8zm6.6 6h70.9L50 1010.3l-35.4-32.9zm-4.6 3.9l38 35.2c1.1 1.1 2.9 1.1 4.1 0l38-35.2v46.1H10v-46.1z'
					fill={inverted ? '#fff' : '#282828'}
					transform='translate(0 -952.362)'
				></path>
			</svg>
		</a>
	)
}

const ShareIcon = ({ inverted }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px' viewBox='0 0 100 100' className={'inline-block'}>
			<path
				fill={inverted ? '#fff' : '#282828'}
				d='M74.965 67.27c-3.133 0-6.059 1.04-8.148 3.121l-29.875-17.27c.21-1.039.418-1.875.418-2.914 0-1.04-.211-1.875-.418-2.914L66.399 30.23c2.297 2.082 5.222 3.328 8.566 3.328 6.895 0 12.535-5.617 12.535-12.484 0-6.863-5.64-12.48-12.535-12.48-6.894 0-12.535 5.617-12.535 12.484 0 1.04.207 1.875.418 2.914L33.391 41.055c-2.297-2.082-5.223-3.328-8.566-3.328-6.895 0-12.324 5.617-12.324 12.484s5.64 12.484 12.535 12.484c3.343 0 6.265-1.246 8.566-3.328l29.668 17.27c-.211.832-.418 1.664-.418 2.703 0 6.66 5.43 12.066 12.117 12.066 6.684 0 12.117-5.41 12.117-12.066-.004-6.66-5.434-12.07-12.121-12.07z'
			></path>
		</svg>
	)
}

const ShareIcons = (props) => {
	const [isActive, setIsActive] = useState(false)

	const showShareIcons = () => {
		setIsActive(true)
	}

	return (
		<div className={'cursor-pointer'}>
			<LayoutGroup>
				{!isActive && (
					<motion.div
						layout
						initial={{
							opacity: 0,
						}}
						enter={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						transition={{
							duration: 0.2,
						}}
						className={'sm:ml-4 w-full cursor:pointer'}
						onClick={() => showShareIcons()}
						style={{
							color: props.inverted ? '#fff' : '#282828',
						}}
					>
						<ShareIcon inverted={props.inverted} /> <span className={'hidden sm:inline'}>Share</span>
					</motion.div>
				)}
				{isActive && (
					<motion.div
						initial={{
							x: -10,
							opacity: 0,
						}}
						enter={{
							x: 0,
							opacity: 1,
						}}
						exit={{
							x: -10,
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.3,
							delay: 0.3,
							// type: 'spring',
							// stiffness: 5,
							// damping: 1,
						}}
						className={'sm:ml-4 w-full'}
					>
						<TwitterIcon text={encodeURI(props.shareProps.socialTitle)} url={props.shareProps.url} inverted={props.inverted} />
						<FacebookIcon text={props.shareProps.socialTitle} url={props.shareProps.url} inverted={props.inverted} />
						<WhatsappIcon text={props.shareProps.socialTitle} url={props.shareProps.url} inverted={props.inverted} />
						<MailIcon text={encodeURI(props.shareProps.socialTitle)} url={props.shareProps.url} inverted={props.inverted} />
					</motion.div>
				)}
			</LayoutGroup>
		</div>
	)
}

export default ShareIcons

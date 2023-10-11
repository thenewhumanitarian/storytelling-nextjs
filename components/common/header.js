import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ShareIcons from '@components/common/shareIcons'

const Header = ({ dark, shareProps, lang, hideBackButton }) => {
	const [isBlinking, setIsBlinking] = useState(true)

	useEffect(() => {
		let interval = null
		let amountOfBlinks = 0
		let totalBlinks = 10
		let i = 0
		interval = setInterval(() => {
			if (i % 2 && i < totalBlinks) {
				setIsBlinking(false)
			} else {
				setIsBlinking(true)
			}
			if (i >= totalBlinks) {
				i = 0
			} else {
				i++
				amountOfBlinks++
				// console.log(amountOfBlinks, totalBlinks)
			}
			if (amountOfBlinks >= totalBlinks) {
				clearInterval(interval)
				setIsBlinking(true)
			}
		}, 600)
	}, [])

	return (
		<header className={`${dark ? 'bg-black shadow-xs shadow-white' : 'bg-white'} flex items-center justify-between w-screen cursor-default h-20 top-0 left-0 z-50`}>
			<div className='grid grid-cols-3 items-center px-6 w-full'>
				<div className='flex justify-start gap-x-2 sm:gap-x-8 items-center'>
					<div className={`${dark ? 'text-white' : 'text-black'} fill-current flex gap-3 items-center justify-start`}>
						<div className='flex fpoex-col items-center align-stsart'>
							{hideBackButton ? (
								<a rel={'noopener noreferrer'} target='_blank' className='hidden sm:block sm:hidden bg-burgundy px-2 py-1 text-white font-normal text-sm font-bold' href='https://www.thenewhumanitarian.org/membership'>
									Donate
								</a>
							) : (
								<Link href={`${lang === 'en' ? '/car-live-blog/en/' : '/car-live-blog/fr/'}`}>
									<button className={'block sm:hidden bg-burgundy px-2 py-1 text-white font-normal text-sm font-bold'}>
										<span>{lang === 'en' ? '← ' : '← '}</span>
										<span className={'hidden sm:block'}>{lang === 'en' ? 'Overview' : 'Retour'}</span>
									</button>
								</Link>
							)}
							<a rel={'noopener noreferrer'} target='_blank' className='hidden sm:block bg-burgundy px-3 py-2 text-white font-normal text-sm font-bold' href='https://www.thenewhumanitarian.org/membership'>
								Donate
							</a>
						</div>
					</div>
				</div>
				<div className='flex justify-center'>
					<div className='h-10'>
						<svg xmlns='http://www.w3.org/2000/svg' id='ANIMATED-LOGO' height={'100%'} viewBox='0 0 405.32 109.7' className={`${dark ? 'text-white' : 'text-gray-900'}`}>
							<title>Logo of The New Humanitarian</title>
							<path
								className='fill-current cls-1'
								d='M176.13,87.43l-6.74.13-.12-2,2.41-.61V66.47c0-2.6-1.11-3.71-3.09-3.71-1.67,0-3.22.93-5.07,2.1l-1.55.93V84.9l2.48.61-.13,2-6.8-.13-7.36.13-.12-2,3.28-.61V46.25l-2.11.37L141,46.56V84.9l5.81.61-.12,2-10.51-.13-10.51.13-.19-2,5.94-.61V46.56l-6.87.06-4.2,10.14h-2V44.15l18.11.12L152,44.21l7.79-.74,2.22-.06v20l10.14-6.31c3.28,0,5.26.62,6.56,2s2,3.46,2,7.23V84.9l3.58.61-.12,2Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M193.63,71.48c.44,6.55,4.27,10.45,9.71,10.45a13.87,13.87,0,0,0,7.42-2.35l1.05,1.79a34.46,34.46,0,0,1-11.68,7c-8.29,0-14.9-5.56-14.9-14.53,0-8.53,5.19-14.47,15-16.82,7.42,0,11.56,4.58,11.56,11.5v2.91Zm9.28-2.29V68c0-5-.93-8-4.39-8-3.15,0-4.89,3.21-5,8.78,0,.25.06.49.06.74Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M233.55,52.87l-1.06-3.34V84.9l4.46.61-.07,2L231,87.43l-5.75.13-.19-2,4.39-.61v-38l-4.32-.74.18-2,5.07.12,8.29-.12,19.47,27.27,1.12,3V46.75l-4.45-.62.06-2,5.81.12,5.75-.12.19,2-4.33.62v41h-4.64Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M275.29,71.48c.43,6.55,4.26,10.45,9.7,10.45a13.87,13.87,0,0,0,7.42-2.35l1,1.79a34.46,34.46,0,0,1-11.68,7c-8.29,0-14.9-5.56-14.9-14.53,0-8.53,5.19-14.47,15-16.82,7.42,0,11.56,4.58,11.56,11.5v2.91Zm9.27-2.29V68c0-5-.93-8-4.39-8-3.15,0-4.88,3.21-5,8.78,0,.25.06.49.06.74Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M320.36,70.43l-.31-2.6L313.81,86.5l-7.48,2-10-28-2.72-.61.19-1.92,7.66.06,7.05-.06.19,1.92-3.09.61,6.24,19.3.43,3,6-17.93-1.48-4.33-2.54-.61.19-1.92,7.48.06,7-.06.19,1.92-3.1.61,6.25,19.36.37,2.9,7.11-22.26-3.21-.61.18-1.92,4.82.06,4.21-.06.18,1.92-3.15.61-8.66,26-7.48,2Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M43.9,136.15l4.39-.62V97.38l-4.39-.62.19-2,8.9.12,8.66-.12.18,2-4,.62v17H74v-17l-4.09-.62.13-2,8.72.12,8.84-.12.18,2-4.26.62v38.15l4.26.62-.18,2-8.84-.13-8.72.13-.13-2,4.09-.62V117H57.81v18.55l4,.62-.18,2L53,138.06l-8.9.13Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M119.28,129.78a13.38,13.38,0,0,0,.74,5.07l2.66-.13.19,2-10.52,2L110.93,133l-9.58,6.06c-3.34,0-5.57-.68-6.86-2-1.49-1.48-1.92-3.58-1.92-7.29V112l-3.34.31-.19-2,9.71-1.92,2.72-.12v21c0,2.78,1,4,3.4,4,1.43,0,2.72-.74,4.33-1.79l1.42-.87V112l-3.21.31-.19-2,9.34-1.92,2.72-.12Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M170.05,138.06l-7.05.13-.19-2,2.35-.62V117.1c0-2.6-1-3.71-2.91-3.71-1.6,0-3.33,1-4.94,2l-1.3,1v19.11l2.29.62-.19,2-6.68-.13-6.49.13-.18-2,2.28-.62V117.1c0-2.6-1-3.71-2.9-3.71-1.61,0-3.34,1-4.89,2l-1.36,1v19.11l2.35.62-.12,2-6.93-.13-7.23.13-.19-2,3.47-.62V112l-3.53.31-.25-1.92,9.84-2.1,2.35-.06.18,5.75,9.52-6.31c2.91,0,4.76.5,6.12,1.55s2.11,2.41,2.35,4.82l9.71-6.37c3.4,0,5.32.68,6.68,2s1.85,3.4,1.85,7.18v18.61l3.65.62-.12,2Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M194.47,107.7c8.6,0,11.81,2,11.81,9.34v12.74a12.44,12.44,0,0,0,.81,4.94l2.9-.18.25,2-10.82,2.22-1.73-5-7.79,5.32c-5.32,0-9.34-2.9-9.34-8a8.17,8.17,0,0,1,3-6.56l13.73-4.2v-4.58c0-3.46-.62-5-3.47-5a7.72,7.72,0,0,0-3.27.74l-1.05,7.12h-7.92V112.9Zm2.85,14.47-5.94,2.35a6.51,6.51,0,0,0-1.92,4.89c0,3.09,1.55,4.69,3.28,4.69a5.85,5.85,0,0,0,3.28-1.23l1.3-.87Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M220.38,138.06l-7.48.13-.18-2,3.46-.62V112l-3.53.43-.24-2,10-2.1,2.35-.06.06,5.75,10.14-6.31c3.34,0,5.32.62,6.62,1.92s1.92,3.4,1.92,7.17v18.74l3.64.62-.12,2-7.73-.13-7,.13-.18-2,2.41-.62V117.1c0-2.6-1-3.71-3-3.71-1.79,0-3.34.93-5.13,2.1l-1.49,1v19l2.48.62-.13,2Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M258,138.06l-7.67.13-.12-2,3.4-.62V112l-3.4.43-.25-2,9.89-2,2.42-.06v27.27l3.52.62-.12,2Zm-3.46-43,5.62-.37,2,.37.44,4.08-.81,3.65-5.62.37-2-.37-.5-4.27Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M266.76,111.78v-1.11l1.24-1.24h3.64v-4.2l7.18-4.64h1.42v9h8.1v2.22h-8.1V130c0,2.41,1.3,3.84,3.28,3.84a10.5,10.5,0,0,0,4.94-1.43l.87,1.8L280,139.05c-5.19,0-8.41-2.6-8.41-8.28v-19Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M305.41,107.7c8.59,0,11.81,2,11.81,9.34v12.74a12.45,12.45,0,0,0,.8,4.94l2.91-.18.24,2-10.82,2.22-1.73-5-7.79,5.32c-5.32,0-9.34-2.9-9.34-8a8.17,8.17,0,0,1,3-6.56l13.73-4.2v-4.58c0-3.46-.62-5-3.46-5a7.73,7.73,0,0,0-3.28.74l-1.05,7.12h-7.92V112.9Zm2.84,14.47-5.94,2.35a6.54,6.54,0,0,0-1.91,4.89c0,3.09,1.54,4.69,3.27,4.69a5.85,5.85,0,0,0,3.28-1.23l1.3-.87Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M335.4,118.21l5.93-10.2h5.32v8.6h-7.17c-.81.37-2.35,2.35-3.16,3.21l-.68.81v14.9l5.94.62-.19,2-9.89-.13-7.79.13-.12-2,3.46-.62V112l-3.46.31-.25-1.92,9.34-2.1,2.16-.12Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M357.41,138.06l-7.67.13-.12-2,3.4-.62V112l-3.4.43-.25-2,9.89-2,2.42-.06v27.27l3.52.62-.12,2ZM354,95l5.62-.37,2,.37.44,4.08-.81,3.65-5.62.37-2-.37-.5-4.27Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M382.14,107.7c8.6,0,11.81,2,11.81,9.34v12.74a12.44,12.44,0,0,0,.81,4.94l2.9-.18.25,2-10.82,2.22-1.73-5-7.79,5.32c-5.32,0-9.34-2.9-9.34-8a8.17,8.17,0,0,1,3-6.56l13.73-4.2v-4.58c0-3.46-.62-5-3.46-5a7.73,7.73,0,0,0-3.28.74l-1.05,7.12h-7.92V112.9ZM385,122.17l-5.94,2.35a6.54,6.54,0,0,0-1.91,4.89c0,3.09,1.54,4.69,3.27,4.69a5.85,5.85,0,0,0,3.28-1.23L385,132Z'
								transform='translate(-43.9 -43.41)'></path>
							<path
								className='fill-current cls-1'
								d='M408.05,138.06l-7.48.13-.18-2,3.46-.62V112l-3.53.43-.24-2,9.95-2.1,2.35-.06.06,5.75,10.14-6.31c3.34,0,5.32.62,6.62,1.92s1.92,3.4,1.92,7.17v18.74l3.64.62-.12,2-7.73-.13-7,.13-.18-2,2.41-.62V117.1c0-2.6-1-3.71-3-3.71-1.79,0-3.34.93-5.13,2.1l-1.49,1v19l2.48.62-.13,2Z'
								transform='translate(-43.9 -43.41)'></path>
							<rect
								id='cursor'
								style={{
									fill: 'rgb(159, 62, 82)',
									opacity: isBlinking ? 1 : 0,
								}}
								x='399.54'
								y='48.81'
								width='5.79'
								height='60.89'></rect>
						</svg>
					</div>
				</div>
				<div className='justify-end hidden'><p className={`${dark ? 'text-white' : ''} font-serif`}>Journalism from the heart of crises</p></div>
				<div className={`flex justify-end items-center gap-2 ${dark ? 'text-white' : 'text-black'}`}>
					{shareProps && <ShareIcons shareProps={shareProps} inverted={dark} />}
				</div>
			</div>
		</header>
	)
}

export default Header

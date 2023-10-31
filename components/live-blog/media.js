// import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
	loading: () => <p>Loading...</p>, // Optional loading component
	ssr: false // This line is important. It disables server-side rendering for this component.
});

// import ReactPlayer from 'react-player/lazy'
import RichtextComponent from '@components/live-blog/text'
// import VisibilitySensor from 'react-visibility-sensor'

// const MediaPlayer = ({ el, i, autoPlay, lang }) => {
const MediaPlayer = ({ el, lang }) => {
	console.log(lang)

	if (el.mediaUrl) {
		return (
			<>
				<div className={`bg-burgundy p-1 flex flex-col items-center justify-center`}>
					<div className={`relative w-full block h-0 pt-16/9`}>
						<ReactPlayer
							width={'100%'}
							config={{
								youtube: {
									playerVars: {
										// cc_lang_pref: lang || 'en',
										// cc_load_policy: 1,
										// showinfo: 0,
										// modestbranding: 1,
										// rel: 0,
									},
								},
								attributes: {
									crossOrigin: 'anonymous',
								},
								file: {
									tracks: [
										{
											kind: 'subtitles', src: el.captionFile?.url, srcLang: 'en', default: true, mode: 'showing', label: 'English'
										},
									]
								}
							}}
							controls

							playsinline
							url={el.mediaUrl || null}
						/>
						{el.credit && (
							<div className={'absolute left-0 bottom-0 bg-white opacity-80 hover:opacity-100 px-1'}>
								<span>{el.credit}</span>
							</div>
						)}
					</div>
				</div>
				{el.caption?.json && (
					<div className={'p-3 bg-gray-50 m-0 p-0 caption-box'}>
						<RichtextComponent content={el.caption.json} />
					</div>
				)}
			</>
		)
	}

	if (el.media?.url && !el.mediaUrl) {
		const isAudioFile = el.placeholderImage?.url && el.media.url.match(/\.(mp3|ogg|wav)$/)

		return (
			<>
				<div className={`bg-burgundy p-1 flex flex-col items-center justify-center ${el.caption?.json ? '' : 'mb-8'}`}>
					<div className={'relative w-full block h-0 pt-16/9'}>
						<ReactPlayer
							width={'100%'}
							height={'100%'}
							className={`absolute top-0 left-0 w-full h-full`}
							config={{
								attributes: {
									crossOrigin: 'anonymous',
								},
								file: {
									tracks: [
										{
											kind: 'subtitles',
											src: el.captionFile?.url,
											srcLang: 'en',
											default: lang === 'en',
											mode: lang === 'en' ? 'showing' : 'hidden',
											label: 'English'
										},
										{
											kind: 'subtitles',
											src: el.captionFileFrench?.url,
											srcLang: 'fr',
											default: lang === 'fr',
											mode: lang === 'fr' ? 'showing' : 'hidden',
											label: 'Français'
										}
									]
								}
							}}
							controls
							playsinline
							url={`${el.media.url}`}
						/>
						{isAudioFile && (
							<img src={el.placeholderImage.url} className={'absolute w-full h-full object-cover'} />
						)}
						{el.credit && (
							<div className={'absolute left-0 bottom-0 bg-white opacity-80 hover:opacity-100 px-1'}>
								<span>{el.credit}</span>
							</div>
						)}
					</div>
				</div>
				{el.caption?.json && (
					<div className={'p-3 bg-gray-50 m-0 p-0 caption-box'}>
						<RichtextComponent content={el.caption.json} />
					</div>
				)}
			</>
		)
	}
}

export default MediaPlayer

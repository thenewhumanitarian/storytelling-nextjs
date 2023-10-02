// import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
	loading: () => <p>Loading...</p>, // Optional loading component
	ssr: false // This line is important. It disables server-side rendering for this component.
});

import ReactAudioPlayer from 'react-audio-player'
// import ReactPlayer from 'react-player'

const AudioPlayerComponent = ({ el, lang }) => {
	if (el.youtubeId) {
		return (
			<>
				<div className={`bg-black p-3 flex flex-col items-center justify-center ${el.caption?.json ? '' : 'mb-8'}`}>
					<div className={'relative w-full block h-0 pt-16/9'}>
						<ReactPlayer
							width={'100%'}
							config={{
								youtube: {
									playerVars: {
										cc_lang_pref: lang || 'en',
										cc_load_policy: 1,
										showinfo: 0,
										modestbranding: 1,
										rel: 0,
									},
								},
							}}
							controls
							playsinline
							url={`https://www.youtube.com/embed/${el.youtubeId}`}
						/>
						{el.credit && (
							<div className={'absolute left-0 bottom-0 bg-white opacity-80 hover:opacity-100 px-1'}>
								<span>{el.credit}</span>
							</div>
						)}
					</div>
				</div>
				{/* {el.caption?.json && (
					<p className={'px-1 py-2'}>
						<RichtextComponent content={el.caption.json} />
					</p>
				)} */}
			</>
		)
	} else {
		return <ReactAudioPlayer className={'w-full mb-5'} src={el.audio.url} controls />
	}

}

export default AudioPlayerComponent

import React, { useEffect, useState } from 'react'

// import ReactPlayer from 'react-player/lazy'

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
	loading: () => <p>Loading...</p>, // Optional loading component
	ssr: false // This line is important. It disables server-side rendering for this component.
});

import VisibilitySensor from 'react-visibility-sensor'

const VideoPlayer = ({ el, i, autoPlay }) => {
	console.log(el)

	const [isPlaying, setIsPlaying] = useState(false)
	const [userClicked, setUserClicked] = useState(false)

	function onChange(isVisible) {
		setIsPlaying(isVisible)
	}

	/* Activate autoplay if set in Contentful */
	useEffect(() => {
		setUserClicked(autoPlay)
	}, [autoPlay])

	return (
		<VisibilitySensor onChange={onChange}>
			<div
				onClick={() => {
					if (userClicked) {
						return
					}
					setUserClicked(true)
				}}
				style={{
					position: 'relative',
					paddingTop: el.videoHeight ? `${el.videoHeight}%` : '56.25%',
					cursor: 'pointer',
				}}
			>
				<ReactPlayer
					controls
					key={`video-element-${i}`}
					playing={isPlaying && userClicked}
					playsinline
					url={el.image?.url || el.mediaUrl?.replace('https', 'http') || el.videoUrl?.replace('https', 'http') || el.video?.url}
					style={{
						position: 'absolute',
						zIndex: 1,
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
					}}
					width={'100%'}
					height={'100%'}
					config={{
						youtube: {
							playerVars: {
								showinfo: 0,
								modestbranding: 1,
								rel: 0,
							},
						},
					}}
				/>
			</div>
		</VisibilitySensor>
	)
}

export default VideoPlayer

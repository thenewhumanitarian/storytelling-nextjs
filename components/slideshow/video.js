import React, { useEffect, useState } from 'react'

import ReactPlayer from 'react-player/lazy'
import VisibilitySensor from 'react-visibility-sensor'

const VideoPlayer = ({ el, i, autoPlay }) => {
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
      >
        <ReactPlayer
          controls
          key={`video-element-${i}`}
          playing={isPlaying && userClicked}
          playsinline
          url={
            el.image?.url ||
            el.mediaUrl?.replace('https', 'http') ||
            el.videoUrl?.replace('https', 'http') ||
            el.video?.url
          }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
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

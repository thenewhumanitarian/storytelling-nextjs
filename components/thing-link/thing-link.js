import { useEffect, useState } from 'react'
import Image from 'next/image'

import ThingLinkButton from './thing-link-button'
import RichtextComponent from '@components/richText'

const ThingLinkComponent = ({ thinglink }) => {
  const buttons = thinglink.buttonsCollection.items
  const [isInIframe, setIsInIframe] = useState(false)
  const [maxWidth, setMaxWidth] = useState(900)

  useEffect(() => {
    // Check if the page is inside an iframe
    setIsInIframe(window.self !== window.top)

    // Select body and set overflow to hidden
    const body = document.querySelector('body')
    if (body) {
      body.style.overflow = 'hidden'
    }

    return () => {
      if (body) {
        body.style.overflow = ''
      }
    }
  }, [])

  return (
    <>
      {/* Only show the switch if NOT inside an iframe */}
      {!isInIframe && (
        <div className="flex justify-center gap-4 my-4">
          <button
            className={`px-4 py-2 ${maxWidth === 900 ? 'bg-burgundy text-white' : 'bg-zinc-200 hover:bg-zinc-100'}`}
            onClick={() => setMaxWidth(900)}
          >
            900px
          </button>
          <button
            className={`px-4 py-2 ${maxWidth === 700 ? 'bg-burgundy text-white' : 'bg-zinc-200 hover:bg-zinc-100'}`}
            onClick={() => setMaxWidth(700)}
          >
            700px
          </button>
          <button
            className={`px-4 py-2 ${maxWidth === 320 ? 'bg-burgundy text-white' : 'bg-zinc-200 hover:bg-zinc-100'}`}
            onClick={() => setMaxWidth(320)}
          >
            320px
          </button>
        </div>
      )}

      <div
        className={'w-full h-full relative'}
        style={!isInIframe ? { maxWidth: `${maxWidth}px`, margin: '0 auto' } : {}}
      >
        <Image
          src={thinglink.baseImage.url}
          width={thinglink.baseImage.width}
          height={thinglink.baseImage.height}
          alt="Picture of the author"
          placeholder='blur'
          blurDataURL={`${thinglink.baseImage.url}?w=20&q=50`}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <div className={'absolute top-0 left-0 w-full h-full'}>
          {buttons.map((button, i) => (
            <ThingLinkButton key={i} data={button} allData={buttons} index={i} />
          ))}
        </div>
      </div>
      {thinglink.caption?.json || thinglink.showTitle && (
        <div className={'py-2 px-3 bg-gray-100'}>
          {thinglink.showTitle && <h3>{thinglink.title}</h3>}
          {thinglink.caption?.json && <RichtextComponent content={thinglink.caption?.json} />}
        </div>
      )}
    </>
  )
}

export default ThingLinkComponent

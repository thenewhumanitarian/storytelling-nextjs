import { useEffect, useState } from 'react'

const IframeComponent = ({ el }) => {
  console.log(el)

  // Find out about screen width with useEffect and save in useState
  const [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  // Reset the screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={'relative w-full '}
      style={{
        paddingTop: screenWidth > 500 ? `${el.iframeHeight}%` : `${el.iframeHeightMobile}%`
      }}
    >
      <iframe
        className={'absolute w-full h-full sm:p-12'}
        src={el.iframeUrl}
      />
    </div>
  )
}

export default IframeComponent

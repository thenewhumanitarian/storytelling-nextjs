const IframeComponent = ({ el }) => {
  return (
    <iframe
      className={'absolute top-0 left-0 w-full h-full flex overflow-hidden'}
      src={el.iframeUrl}
    />
  )
}

export default IframeComponent

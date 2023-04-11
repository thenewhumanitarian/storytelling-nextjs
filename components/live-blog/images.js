import { useState, useCallback } from 'react'

import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'

const ImageGrid = ({ images }) => {
	const [currentImage, setCurrentImage] = useState(0)
	const [viewerIsOpen, setViewerIsOpen] = useState(false)

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index)
		setViewerIsOpen(true)
	}, [])

	const closeLightbox = () => {
		setCurrentImage(0)
		setViewerIsOpen(false)
	}

	const photos = images.map((image) => ({
		src: image.url,
		height: image.height,
		width: image.width,
    title: image.description || undefined
	}))

	// const imageRenderer = useCallback(
	// 	({ index, left, top, key, photo }) => (
	// 		<img onClick={openLightbox} className={'mr-1 mb-1'} key={key} index={index} src={photo.src} width={photo.width} height={photo.height} left={left} top={top} />
	// 	),
	// 	[]
	// )

	// let columns = 1

	// if (containerWidth >= 500) columns = 2
	// if (containerWidth >= 900) columns = 3
	// if (containerWidth >= 1500) columns = 4

	return (
		<div className={'my-5'}>
			{/* <Gallery photos={photos} onClick={openLightbox} renderImage={imageRenderer} /> */}
			<Gallery photos={photos} onClick={openLightbox} />
			<ModalGateway>
				{viewerIsOpen ? (
					<Modal onClose={closeLightbox}>
						<Carousel
							currentIndex={currentImage}
							views={photos.map((x) => ({
								...x,
								srcset: x.srcSet,
								caption: x.title,
							}))}
						/>
					</Modal>
				) : null}
			</ModalGateway>
		</div>
	)
}

export default ImageGrid

import { useState, useCallback } from 'react'

import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
/* Use this: http://react-responsive-carousel.js.org/ */

const ImageGrid = ({ images }) => {
	const [currentImage, setCurrentImage] = useState(0)
	const [viewerIsOpen, setViewerIsOpen] = useState(false)

	const customStyles = {
		container: (base) => ({
			...base,
			backgroundColor: '#000',
		}),
		view: (base) => ({
			...base,
			'.react-images__footer__caption > span': {
				color: 'red',
				fontSize: '2rem',
			},
			'& > img': {
				maxHeight: '100vh',
				margin: '5vh auto',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
			},
		}),
	}

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
		title: image.description || undefined,
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
		<div>
			{/* <Gallery photos={photos} onClick={openLightbox} renderImage={imageRenderer} /> */}
			<Gallery photos={photos} onClick={openLightbox} />
			<ModalGateway>
				{viewerIsOpen ? (
					<Modal onClose={closeLightbox}>
						<Carousel
							styles={customStyles}
							currentIndex={currentImage}
							hideControlsWhenIdle={false}
							modalProps={{ allowFullscreen: false }}
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

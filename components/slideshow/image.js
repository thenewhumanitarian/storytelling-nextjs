import Image from 'next/image'

const SlideshowImage = ({ el, nextEl }) => {
	if (el.image) {
		console.log(`${el.image?.url}?w=20`)
	}

	return (
		<>
			{nextEl && (
				<div className={'absolute top-0 left-0 w-full h-full opacity-0'}>
					<Image
						src={nextEl.image?.url}
						className={'pointer-events-none'}
						// width={nextEl.image?.width}
						// height={nextEl.image?.height}
						alt={nextEl.image?.description}
						layout={'fill'}
						key={`nextEl.sys.id`}
					/>
				</div>
			)}
			<Image
				src={el.image?.url}
				className={'pointer-events-none'}
				alt={el.image?.description}
				layout={'fill'}
				key={`el.sys.id`}
				// width={el.image?.width}
				// height={el.image?.height}
				placeholder={'blur'}
				blurDataURL={`${el.image?.url}?w=5`}
			/>
		</>
	)
}

export default SlideshowImage

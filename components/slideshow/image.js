import Image from "next/legacy/image"

const SlideshowImage = ({ el, nextEl }) => {
	return (
		<div className={'w-full'}>
			{nextEl && (
				<div className={'top-0 left-0 w-full h-full opacity-0'}>
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
				blurDataURL={`${el.image?.url}?w=5`}
				className={'pointer-events-none'}
				alt={el.image?.description}
				layout={'fill'}
				key={`el.sys.id`}
				placeholder={'blur'}
				// style={{ minWidth: '100%' }}
				// width={el.image?.width}
				// height={el.image?.height}
			/>
		</div>
	)
}

export default SlideshowImage

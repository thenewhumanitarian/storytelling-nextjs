import Image from "next/image"

const SlideshowImage = ({ el, nextEl }) => {
	return (
		<div className={'w-full'}>
			{nextEl && (
				<div className={'top-0 left-0 w-full h-full opacity-0 absolute'}>
					<Image
						key={`nextEl.sys.id`}
						src={nextEl.image?.url}
						className={'pointer-events-none'}
						width={nextEl.image?.width}
						height={nextEl.image?.height}
						alt={nextEl.image?.description}
					/>
				</div>
			)}
			<Image
				key={`el.sys.id`}
				src={el.image?.url}
				width={el.image?.width}
				height={el.image?.height}
				className={'pointer-events-none'}
				alt={el.image?.description}
				placeholder={'blur'}
				blurDataURL={`${el.image?.url}?w=20&q=50`}
				style={{
					width: '100%',
					height: 'auto',
				}}
			/>
		</div>
	)
}

export default SlideshowImage

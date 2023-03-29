import Link from 'next/link'

const HorizontalTimelineComponent = ({ liveBlogs }) => {
	return (
		<ul className={'border-t-4 border-black'}>
			{/* {liveBlogs.map((el) => {
				return (
					<li key={el.slug}>
						<Link href={`/slideshow/${el.slug}`}>
							<a>{el.title}</a>
						</Link>
					</li>
				)
			})} */}
		</ul>
	)
}

export default HorizontalTimelineComponent

import Link from 'next/link'
import HorizontalScroll from 'react-scroll-horizontal'

const HorizontalTimelineComponent = ({ liveBlogs }) => {
	const blogEntries = liveBlogs.map((el) => {
		return (
			<li key={el.slug} className={'relative float-left pr-10 w-64 flex-none'}>
				<Link href={`/slideshow/${el.slug}`}>
					<p className={'pl-2 mt-3 font-bold cursor-pointer hover:text-burgundy'}>{el.title}</p>
				</Link>
				<div className={'w-3 h-3 bg-burgundy rounded-full absolute -top-2 left-0'} />
			</li>
		)
	})

	return (
		<ul className={'border-t-4 border-black w-full flex h-24 -z-1'}>
			<HorizontalScroll reverseScroll>
				{blogEntries}
				{blogEntries}
				{blogEntries}
			</HorizontalScroll>
		</ul>
	)
}

export default HorizontalTimelineComponent

import Link from 'next/link'
import ArticleChecker from '@components/live-blog/articleChecker'
import HorizontalScroll from 'react-scroll-horizontal'
import moment from 'moment'
// import { motion, AnimatePresence } from 'framer-motion'

const HorizontalTimelineComponent = ({ liveBlogs, lang }) => {
	const blogEntries = liveBlogs
		.sort((a, b) => moment(b.date) - moment(a.date))
		.map((el) => {
			const dateOneDayAgo = moment(new Date()).subtract(1, 'days')
			const dateIsOld = moment(el.date).isBefore(dateOneDayAgo)

			let datePublished = dateIsOld ? moment(el.date).format('DD MMMM YY') : moment(el.date).fromNow()

			return (
				<li key={el.slug} className={'pr-10 w-64 snap-center'}>
					<Link href={`/car-live-blog/${lang}/entries/${el.slug}`}>
						<div className={'pl-4 mt-2'}>
							<div className={'flex flex-row justify-between'}>
								<span className={'text-base'}>{datePublished}</span>
								<ArticleChecker slug={el.slug} lang={lang} />
							</div>
							<p className={'font-bold cursor-pointer hover:text-burgundy line-clamp-2'}>{el.title}</p>
						</div>
					</Link>
					<div className={'w-1 h-3 bg-burgundy absolute top-0'} />
				</li>
			)
		})

	return (
		<>
			<div className={'text-center'}>
				<h1 className={'pb-4 m-0'}>The CAR Live Blog</h1>
				<p className={'m-0 pb-6 -mt-2'}>Some subtitle</p>
			</div>
			<ul className={'relative border-t-4 border-black w-full flex h-24 px-5'}>
				<HorizontalScroll reverseScroll className={'snap-x snap-mandatory'}>
					{blogEntries}
					{blogEntries}
				</HorizontalScroll>
			</ul>
		</>
	)
}

export default HorizontalTimelineComponent

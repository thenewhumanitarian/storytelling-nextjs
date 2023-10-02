import { useContext, useState, useEffect } from 'react';
import moment from 'moment'
import { useRouter } from 'next/router'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ArticleChecker from '@components/live-blog/articleChecker'
import useDrag from './useDrag'
import 'react-horizontal-scrolling-menu/dist/styles.css';

function HorizontalTimelineComponent({ liveBlogs, lang }) {
	const router = useRouter()

	const [isHover, setIsHover] = useState(false)

	let scrollPosition = 0;

	function lockScroll() {
		scrollPosition = window.pageYOffset;
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollPosition}px`;
		document.body.style.width = '100%';
	}

	function unlockScroll() {
		document.body.style.removeProperty('overflow');
		document.body.style.removeProperty('position');
		document.body.style.removeProperty('top');
		document.body.style.removeProperty('width');
		window.scrollTo(0, scrollPosition);
	}

	// useEffect(() => {
	// 	if (isHover) {
	// 		lockScroll()
	// 	} else {
	// 		unlockScroll()
	// 	}
	// }, [isHover])

	const items = liveBlogs
		.sort((a, b) => moment(b.date) - moment(a.date))
		.map((el) => el)

	const { dragStart, dragStop, dragMove, dragging } = useDrag();
	const handleDrag = ({ scrollContainer }) => (ev) =>
		dragMove(ev, (posDiff) => {
			if (scrollContainer.current) {
				scrollContainer.current.scrollLeft += posDiff;
			}
		});

	const handleItemClick = (slug) => () => {
		if (dragging) {
			return false;
		}
		// Push route to router
		console.log(slug)

		// Push URL to next/router
		router.push(`/car-live-blog/${lang}/entries/${slug}`);

	};

	return (
		<div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={'relative'}>
			<ScrollMenu
				LeftArrow={LeftArrow}
				RightArrow={RightArrow}
				onWheel={onWheel}
				onMouseDown={() => dragStart}
				onMouseUp={() => dragStop}
				onMouseMove={handleDrag}
			>
				{items.map(({ slug, title }) => (
					<Card
						itemSlug={slug} // NOTE: itemId is required for track items
						title={title}
						key={slug}
						onClick={handleItemClick(slug)}
						lang={lang}
					/>
				))}
			</ScrollMenu>
		</div>
	);
}

function onWheel(apiObj, ev) {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 5;

	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext();
	} else if (ev.deltaY > 0) {
		apiObj.scrollPrev();
	}
}

function Arrow({ children, disabled, onClick }) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={'bg-gray-300 px-2 h-full transition-opacity'}
			style={{
				cursor: "pointer",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				right: "1%",
				opacity: disabled ? "0" : "1",
				userSelect: "none",
				zIndex: 500
			}}
		>
			{children}
		</button>
	);
}

function LeftArrow() {
	const { isFirstItemVisible, scrollPrev } =
		useContext(VisibilityContext);

	return (
		<Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
			←
		</Arrow>
	)
}

function RightArrow() {
	const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

	return (
		<Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
			→
		</Arrow>
	)
}

function Card({
	itemSlug,
	onClick,
	title,
	lang
}) {

	return (
		<div
			onClick={() => onClick()}
			role="button"
			style={{
				userSelect: "none"
			}}
			tabIndex={0}
			key={`card-${itemSlug}`}
			className="card inline-block w-64 px-3"
		>
			<div className={'pointer-events-none'}>
				<h3 className={'line-clamp-2 text-lg'}><a href={'#'}>{title}</a></h3>
				<ArticleChecker slug={itemSlug} lang={lang} />
			</div>
		</div>
	);
}


export default HorizontalTimelineComponent;

// import React from 'react';

// import Link from 'next/link'
// import ArticleChecker from '@components/live-blog/articleChecker'
// import moment from 'moment'
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// // import HorizontalScroll from 'react-scroll-horizontal'
// // import { motion, AnimatePresence } from 'framer-motion'
// import useDrag from './useDrag';

// const HorizontalTimelineComponent = ({ liveBlogs, lang }) => {
// 	const blogEntries = liveBlogs
// 		.sort((a, b) => moment(b.date) - moment(a.date))
// 		.map((el) => {
// 			const dateOneDayAgo = moment(new Date()).subtract(1, 'days')
// 			const dateIsOld = moment(el.date).isBefore(dateOneDayAgo)

// 			let datePublished = dateIsOld ? moment(el.date).format('DD MMMM YY') : moment(el.date).fromNow()

// 			return (
// 				<div key={el.slug} className={'w-64 snap-center flex-shrink-0'}>
// 					<Link href={`/car-live-blog/${lang}/entries/${el.slug}`}>
// 						<div className={'pl-4 mt-2'}>
// 							<div className={'flex flex-row justify-between'}>
// 								<span className={'text-base'}>{datePublished}</span>
// 								<ArticleChecker slug={el.slug} lang={lang} />
// 							</div>
// 							<p className={'font-bold cursor-pointer hover:text-burgundy line-clamp-2'}>{el.title}</p>
// 						</div>
// 					</Link>
// 					<div className={'w-1 h-3 bg-burgundy absolute top-0'} />
// 				</div>
// 			)
// 		})

// 	const { dragStart, dragStop, dragMove, dragging } = useDrag();
// 	const handleDrag = ({ scrollContainer }) => (ev) =>
// 		dragMove(ev, (posDiff) => {
// 			if (scrollContainer.current) {
// 				scrollContainer.current.scrollLeft += posDiff;
// 			}
// 		});

// 	return (
// 		<>
// 			<div className={'text-center'}>
// 				<h1 className={'pb-4 m-0'}>The CAR Live Blog</h1>
// 				<p className={'m-0 pb-6 -mt-2'}>Some subtitle</p>
// 			</div>
// 			<div className="flex overflow-x-auto space-x-8">
// 				<ScrollMenu
// 					// LeftArrow={LeftArrow}
// 					// RightArrow={RightArrow}
// 					// onWheel={onWheel}
// 					onMouseDown={() => dragStart}
// 					onMouseUp={() => dragStop}
// 					onMouseMove={handleDrag}
// 				>
// 					{blogEntries}
// 					{blogEntries}
// 				</ScrollMenu>
// 			</div>
// 		</>
// 	)
// }

// export default HorizontalTimelineComponent
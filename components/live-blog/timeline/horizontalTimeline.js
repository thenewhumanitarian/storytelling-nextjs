import ArticleChecker from '@components/live-blog/dynamicArticleChecker'
import { useRouter } from 'next/router'
import moment from 'moment'
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import useDrag from '../useDrag'
import 'react-horizontal-scrolling-menu/dist/styles.css';
import Arrow, { LeftArrow, RightArrow } from '@components/live-blog/timeline/arrows'

function HorizontalTimelineComponent({ liveBlogs, lang }) {
	const router = useRouter()

	// const [isHover, setIsHover] = useState(false)

	// function lockScroll() {
	// 	scrollPosition = window.pageYOffset;
	// 	document.body.style.overflow = 'hidden';
	// 	document.body.style.position = 'fixed';
	// 	document.body.style.top = `-${scrollPosition}px`;
	// 	document.body.style.width = '100%';
	// }

	// function unlockScroll() {
	// 	document.body.style.removeProperty('overflow');
	// 	document.body.style.removeProperty('position');
	// 	document.body.style.removeProperty('top');
	// 	document.body.style.removeProperty('width');
	// 	window.scrollTo(0, scrollPosition);
	// }

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
		})

	const handleItemClick = (slug) => () => {
		if (dragging) {
			return false;
		}

		// Push URL to next/router
		router.push(`/car-live-blog/${lang}/entries/${slug}`);
	}

	return (
		// <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={'relative'}>
		<div className={'relative'}>
			<ScrollMenu
				LeftArrow={LeftArrow}
				RightArrow={RightArrow}
				onWheel={onWheel}
				onMouseDown={() => dragStart}
				onMouseUp={() => dragStop}
				onMouseMove={handleDrag}
			// scrollContainerClassName={'snap-x'}
			// itemClassName={'snap-center'}
			>
				{items.map(({ slug, title, date }) => (
					<Card
						itemSlug={slug} // NOTE: itemId is required for track items
						title={title}
						key={slug}
						onClick={handleItemClick(slug)}
						lang={lang}
						date={date}
					/>
				))}
			</ScrollMenu>
		</div >
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



function Card({
	itemSlug,
	onClick,
	title,
	date,
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
			className="card inline-block w-64 px-3 snap-center flex-shrink-0"
		>
			<div className={'pointer-events-none'}>
				<h3 className={'line-clamp-2 text-lg mb-0 leading-snug'}><a href={'#'}>{title}</a></h3>
				<p className={'text-gray-600 text-sm'}>{moment(date).format('D MMMM YYYY')}</p>
				<ArticleChecker slug={itemSlug} lang={lang} />
			</div>
		</div>
	);
}


export default HorizontalTimelineComponent;
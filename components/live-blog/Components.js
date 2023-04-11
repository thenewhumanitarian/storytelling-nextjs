import RichtextComponent from '@components/live-blog/text'
import VideoPlayer from '@components/live-blog/video'

const DynamicBlogContentComponent = ({ data }) => {
	const type = data.__typename
	console.log(type)

	if (type === 'LiveBlogContentText') {
		return (
			<>
				<RichtextComponent content={data.text.json} />
			</>
		)
	}

	if (type === 'LiveBlogContentVideo') {
		return (
			<>
				<VideoPlayer el={data.video} />
			</>
		)
	}

	return (
		<>
			<h2>{data.title}</h2>
			<p>Type not defined</p>
		</>
	)
}

export default DynamicBlogContentComponent

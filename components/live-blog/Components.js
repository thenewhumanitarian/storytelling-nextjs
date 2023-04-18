import RichtextComponent from '@components/live-blog/text'
import VideoPlayer from '@components/live-blog/video'
import AudioPlayer from '@components/live-blog/audio'
import ImageGrid from '@components/live-blog/images'

const DynamicBlogContentComponent = ({ data }) => {
	const type = data.__typename
	// console.log(type)

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

	if (type === 'LiveBlogContentAudio') {
		return (
			<>
				<AudioPlayer el={data.audio} />
			</>
		)
	}

	if (type === 'LiveBlogContentImageGrid') {
		// console.log(data)
		return (
			<>
				<ImageGrid images={data.imagesCollection.items} />
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

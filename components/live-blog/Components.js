import RichtextComponent from '@components/live-blog/text'
import VideoPlayer from '@components/live-blog/video'
import AudioPlayer from '@components/live-blog/audio'
import ImageGrid from '@components/live-blog/images'

const DynamicBlogContentComponent = ({ data, lang }) => {
	const type = data.__typename
	// console.log(type)

	if (type === 'LiveBlogContentText') {
		return (
			<div className={'mb-8'}>
				<RichtextComponent content={data.text.json} />
			</div>
		)
	}

	if (type === 'LiveBlogContentVideo') {
		return (
			<div className={'mb-8'}>
				<VideoPlayer el={data.video} />
			</div>
		)
	}

	if (type === 'LiveBlogContentAudio') {
		return (
			<div>
				<AudioPlayer el={data} lang={lang} />
			</div>
		)
	}

	if (type === 'LiveBlogContentImageGrid') {
		// console.log(data)
		return (
			<div className={'mb-8'}>
				<ImageGrid images={data.imagesCollection.items} />
			</div>
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

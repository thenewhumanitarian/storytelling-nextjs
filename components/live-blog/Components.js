import RichtextComponent from '@components/live-blog/text'
import VideoPlayer from '@components/live-blog/video'
import AudioPlayer from '@components/live-blog/audio'
import ImageGrid from '@components/live-blog/images'
import MediaPlayer from '@components/live-blog/media'

const DynamicBlogContentComponent = ({ data, lang }) => {
	const type = data.__typename
	// console.log(type)

	if (type === 'LiveBlogContentText') {
		return (
			<div className={'mb-5'}>
				<RichtextComponent content={data.text.json} />
			</div>
		)
	}

	if (type === 'LiveBlogContentVideo') {
		return (
			<div className={'mb-5'}>
				<VideoPlayer el={data} />
			</div>
		)
	}

	if (type === 'LiveBlogContentMedia') {
		return (
			<div className={'mb-5'}>
				<MediaPlayer el={data} lang={lang} />
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
			<div className={'mb-5'}>
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

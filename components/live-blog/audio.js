import ReactAudioPlayer from 'react-audio-player'

const AudioPlayerComponent = ({ el }) => {
	return <ReactAudioPlayer className={'w-full my-5'} src={el.url} controls />
}

export default AudioPlayerComponent

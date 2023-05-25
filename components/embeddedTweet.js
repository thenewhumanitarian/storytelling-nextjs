import React from 'react'
import { Tweet } from 'react-twitter-widgets'

const TweetComponent = ({ id }) => <Tweet tweetId={id || 841418541026877441} />

export default TweetComponent

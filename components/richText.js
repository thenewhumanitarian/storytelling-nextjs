import React, { useEffect, useState } from 'react';

import Image from "next/image"
import Link from 'next/link'

import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import TweetComponent from '@components/embeddedTweet'

// const website_url = 'thenewhumanitarian.org'

const RichtextComponent = (props) => {
	const { content, className } = props

	const [isLoadedInIframe, setIsLoadedInIframe] = useState(false);

	useEffect(() => {
		// Check if the component is loaded inside an iframe
		setIsLoadedInIframe(window.self !== window.top);
	}, []);

	const options = {
		renderMark: {
			[MARKS.BOLD]: (text) => <strong>{text}</strong>,
			[MARKS.UNDERLINE]: (text) => <u>{text}</u>,
			[BLOCKS.HEADING_1]: (text) => <h1>{text}</h1>,
			[BLOCKS.HEADING_2]: (text) => <h2>{text}</h2>,
			[BLOCKS.HEADING_3]: (text) => <h3>{text}</h3>,
			[BLOCKS.HEADING_4]: (text) => <h4>{text}</h4>,
			[BLOCKS.HEADING_5]: (text) => <h5>{text}</h5>,
			[BLOCKS.LIST_ITEM]: (text) => <li>{text}</li>,
			[BLOCKS.UL_LIST]: (text) => <ul>{text}</ul>,
			[BLOCKS.OL_LIST]: (text) => <ol>{text}</ol>,
		},
		renderNode: {
			[INLINES.HYPERLINK]: (node) => {
				// Set target and rel attributes based on whether it's in an iframe or not
				const target = isLoadedInIframe ? '_blank' : '_parent';
				const rel = isLoadedInIframe ? 'noopener noreferrer' : '';

				return (
					<Link href={node.data.uri} target={target} rel={rel}>
						{node.content[0].value}
					</Link>
				);
			},
			[BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
			[BLOCKS.HEADING_6]: (node, children) => <p>{children}</p>,
			[BLOCKS.HR]: () => <hr className={'mt-5 mb-8'} />,
			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				const url = node.data.target.fields.file.url
				const width = node.data.target.fields.file.details.image.width
				const height = node.data.target.fields.file.details.image.height
				const title = node.data.target.fields.title || node.data.target.fields.description
				const fileName = node.data.target.fields.file.fileName

				return (
					<figure key={fileName} className={'my-5 max-w-4xl'}>
						<Image
							key={fileName}
							alt={title || 'Photo of timeline entry'}
							src={`https:${url.indexOf('?w') > -1 ? url : `${url}?w=850`}`}
							height={height}
							width={width}
							placeholder={'blur'}
							blurDataURL={`https:${url.indexOf('?w') > -1 ? url : `${url}?w=8`}`}
							style={{
								width: '100%',
								height: 'auto',
							}}
						/>
						{/* {description && <figcaption>{description}</figcaption>} */}
					</figure>
				)
			},
			[BLOCKS.EMBEDDED_ENTRY]: (node) => {
				const contentType = node.data.target.sys.contentType.sys.id
				if (contentType === 'tweet') {
					return (
						<div className={'text-burgundy'}>
							<TweetComponent id={node.data.target.fields.id} />
						</div>
					)
				} else {
					return <h1 className={'text-burgundy'}>Missing component in richtext module.</h1>
				}
			},
		},
	}

	return <div className={className}>{documentToReactComponents(content, options)}</div>
}

export default RichtextComponent

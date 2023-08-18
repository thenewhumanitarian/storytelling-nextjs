import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'

const AllSlideshows = ({ slideshows }) => {
	return (
		<div className={'m-5'}>
			<h2 className={'mb-2'}>All TNH slideshows:</h2>
			<ul>
				{slideshows.map((el) => {
					return (
						<li key={el.slug}>
							<Link href={`/slideshow/${el.slug}`}>{el.title}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default AllSlideshows

export const getStaticProps = async () => {
	const query = `{
    imageSliderCollection {
      items {
        sys {
          id
        }
        title
        slug
      }
    }
  }`

	const slideshows = await callContentful(query)

	return {
		props: { slideshows: slideshows.data.imageSliderCollection.items },
		revalidate: 60,
	}
}

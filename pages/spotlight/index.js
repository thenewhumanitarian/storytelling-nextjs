import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'

const AllSpotlights = ({ spotlights }) => {
	return (
		<div className={'m-5'}>
			<h2 className={'mb-2'}>All TNH Spotlight components:</h2>
			<ul>
				{spotlights.map((el) => {
					return (
						<li key={el.slug}>
							<Link href={`/spotlight/${el.slug}`}>
								<p className={'text-base'}>{el.title}</p>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default AllSpotlights

export const getStaticProps = async () => {
	const query = `{
    instaStoryCollection {
      items {
        title
        slug
      }
    }
  }`

	const spotlights = await callContentful(query)

	return {
		props: { spotlights: spotlights.data.instaStoryCollection.items },
		revalidate: 60,
	}
}

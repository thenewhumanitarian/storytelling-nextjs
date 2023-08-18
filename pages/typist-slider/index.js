import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'

const AllTypistSliders = ({ typistSliders }) => {
	return (
		<div className={'m-5'}>
			<h2 className={'mb-2'}>All TNH typist sliders:</h2>
			<ul>
				{typistSliders.map((el) => {
					return (
						<li key={el.slug}>
							<Link href={`/typist-slider/${el.slug}`}>{el.title}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default AllTypistSliders

export const getStaticProps = async () => {
	const query = `{
    typistSliderCollection {
      items {
        title
        slug
        sys {id firstPublishedAt}
      }
    }
  }`

	const typistSliders = await callContentful(query)

	return {
		props: { typistSliders: typistSliders.data.typistSliderCollection.items },
		revalidate: 60,
	}
}

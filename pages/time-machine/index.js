import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'

const AllTimeMachines = ({ timemachines }) => {
	return (
		<div className={'m-5'}>
			<h2 className={'mb-2'}>All TNH time machines:</h2>
			<ul>
				{timemachines.map((el) => {
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

export default AllTimeMachines

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

	const timemachines = await callContentful(query)

	return {
		props: { timemachines: timemachines.data.imageSliderCollection.items },
		revalidate: 60,
	}
}

import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'

const AllBeforeAndAfterSliders = ({ sliders }) => {
	return (
		<div className={'m-5'}>
			<h2 className={'mb-2'}>All TNH before and after sliders:</h2>
			<ul>
				{sliders.map((el) => {
					return (
						<li key={el.slug}>
							<Link href={`/before-and-after/${el.slug}`}>
								<p className={'text-base'}>{el.title}</p>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default AllBeforeAndAfterSliders

export const getStaticProps = async () => {
	const query = `{
		beforeAndAfterSliderCollection {
			items {
				sys {
					id
				}
				title
				slug
			}
		}
  }`

	const sliders = await callContentful(query)

	return {
		props: { sliders: sliders.data.beforeAndAfterSliderCollection.items },
		revalidate: 60,
	}
}

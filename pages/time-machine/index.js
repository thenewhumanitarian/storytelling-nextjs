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
							<Link href={`/time-machine/${el.slug}`}>{el.title}</Link>
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
		timeMachineCollection {
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
		props: { timemachines: timemachines.data.timeMachineCollection.items },
		revalidate: 60,
	}
}

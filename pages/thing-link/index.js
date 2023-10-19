import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'

const AllThingLinks = ({ thinglinks }) => {
	return (
		<div className={'m-5'}>
			<h2 className={'mb-5'}>All TNH "Thing Link" components:</h2>
			<ul className={'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'}>
				{thinglinks.map((el) => {
					return (
						<li key={el.slug} className={'border border-slate-500 p-5 hover:bg-slate-200'}>
							<p className={'text-base'}><Link href={`/thing-link/${el.slug}`}>{el.title}</Link></p>
							<p><Link className={'text-slate-500 font-normal'} href={`/thing-link/setup/${el.slug}`}>⌖ Coordinates, embed code</Link></p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default AllThingLinks

export const getStaticProps = async () => {
	const query = `{
	thingLinkCollection {
			items {
				title
				slug
			}
		}
  }`

	const thinglinks = await callContentful(query)

	return {
		props: { thinglinks: thinglinks.data.thingLinkCollection.items },
		revalidate: 60,
	}
}

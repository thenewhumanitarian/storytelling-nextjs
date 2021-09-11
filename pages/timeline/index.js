import Link from 'next/link'

import { callContentful } from '@utils/contentfulHelper'

const AllTimelines = ({ timelines }) => {
  return (
    <div className={'m-5'}>
      <h2 className={'mb-2'}>All TNH timelines:</h2>
      <ul>
        {timelines.map((el) => {
          return (
            <li key={el.slug}>
              <Link href={`/timeline/${el.slug}`}>
                <a>{el.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AllTimelines

export const getStaticProps = async () => {
  const query = `{
    timelineCollection {
      items {
        title
        slug
      }
    }
  }`

  const timelines = await callContentful(query)

  return {
    props: { timelines: timelines.data.timelineCollection.items },
    revalidate: 60,
  }
}

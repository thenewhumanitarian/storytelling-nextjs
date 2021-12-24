import { callContentful } from '@utils/contentfulHelper'
import { createClient } from 'contentful'
import TimelineComponent from '@components/timeline/timeline.js'

const Timeline = ({ timeline }) => {
  console.log(timeline)

  return (
    <div data-iframe-height={true} className={'w-full overflow-hidden h-auto py-4'}>
      <TimelineComponent content={timeline} />
    </div>
  )
}

export default Timeline

export const getStaticProps = async (context) => {
  const slug = context.params.slug

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const res = await client.getEntries({
    content_type: 'timeline',
    include: 2,
    'fields.slug[in]': slug,
  })

  return {
    props: {
      timeline: res.items[0].fields,
    },
  }
}

export const getStaticPaths = async () => {
  const query = `{
    timelineCollection {
      items {
        slug
      }
    }
  }`

  const timelines = await callContentful(query)

  const paths = timelines.data.timelineCollection.items.map((timeline) => {
    return {
      params: {
        slug: timeline.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: 'blocking', // Creates pages if they don't exist and then stores them...
  }
}

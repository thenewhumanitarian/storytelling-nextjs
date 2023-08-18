import { callContentful } from '@utils/contentfulHelper'

import SpotlightComponent from '@components/spotlight/spotlight'

const Spotlight = ({ spotlight }) => {
  // console.log(spotlight)

  return (
    <div data-iframe-height={true} className={'w-full overflow-hidden h-auto'}>
      <SpotlightComponent content={spotlight} />
    </div>
  )
}

export default Spotlight

export const getStaticProps = async (context) => {
  const slug = context.params.slug

  const query = `{
    instaStoryCollection(limit: 1, where: {slug: "${slug}"}) {
      items {
        sys {
          id
        }
        slug
        title
        imagesCollection {
          items {
            sys {
              id
            }
            title
            text {
              json
            }
            image {
              url
              width
              fileName
              description
              title
              size
              height
            }
            duration
            type
            link
            readMore {
              json
            }
          }
        }
      }
    }
  }`

  const spotlight = await callContentful(query)

  return {
    props: { spotlight: spotlight.data.instaStoryCollection.items[0] },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const query = `{
    instaStoryCollection {
      items {
        slug
      }
    }
  }`

  const spotlights = await callContentful(query)

  const paths = spotlights.data.instaStoryCollection.items.map((spotlight) => {
    return {
      params: {
        slug: spotlight.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: 'blocking', // Creates pages if they don't exist and then stores them...
  }
}

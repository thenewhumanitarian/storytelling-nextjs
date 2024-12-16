import { callContentful } from '@utils/contentfulHelper'

import ThingLinkSetupComponent from '@components/thing-link/thing-link-setup'

const ThingLink = ({ thinglink }) => {
  // console.log(thinglink)

  return (
    <div data-iframe-height={true} className={'w-full overflow-hidden h-auto'}>
      <ThingLinkSetupComponent thinglink={thinglink} />
    </div>
  )
}

export default ThingLink

export const getStaticProps = async (context) => {
  const slug = context.params.slug

  const query = `{
      thingLinkCollection(
        limit: 1
        where: {slug: "${slug}"}
      ) {
        items {
          sys {
            id
          }
          slug
          title
          baseImage {
            url
            width
            fileName
            description
            title
            size
            height
          }
          buttonsCollection {
            ... on ThingLinkButtonsCollection {
              items {
                sys {
                  id
                }
                title
                text {
                  json
                }
                xPosition
                yPosition
                colour
                className
                size
              }
            }
          }
        }
      }
  }`

  const thinglink = await callContentful(query)

  return {
    props: { thinglink: thinglink.data.thingLinkCollection.items[0] },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const query = `{
    thingLinkCollection {
      items {
        slug
      }
    }
  }`

  const thinglinks = await callContentful(query)

  const paths = thinglinks.data.thingLinkCollection.items.map((thinglink) => {
    return {
      params: {
        slug: thinglink.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: 'blocking', // Creates pages if they don't exist and then stores them...
  }
}

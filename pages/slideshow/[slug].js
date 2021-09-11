import { callContentful } from '@utils/contentfulHelper'
import SliderComponent from '@components/slideshow/slider'

const Slideshow = ({ slideshow }) => {
  return <SliderComponent elements={slideshow.imagesCollection.items} />
}

export default Slideshow

export const getStaticProps = async (context) => {
  const slug = context.params.slug

  const query = `{
    imageSliderCollection(limit: 1, where: {slug: "${slug}"}) {
      items {
        sys {
          id
        }
        title
        slug
        subtitle
        description {
          json
        }
        published
        showArrows
        published
        lastUpdate
        adaptiveHeight
        imagesCollection {
          items {
            ... on ImageSliderPhoto {
              caption {
                json
              }
              sys {
                id
              }
              credit
              relativeIframeHeight
              mediaUrl
              title
              iframeUrl
              image {
                url
                size
                description
                height
                width
              }
            }
            ... on SlideshowImageSlide {
              sys {
                id
              }
              text {
                json
              }
              image {
                url
                width
                height
              }
              credit
              title
            }
            ... on SlideshowIframeSlide {
              sys {
                id
              }
              text {
                json
              }
              iframeUrl
              iframeHeight
              iframeHeightMobile
              credit
              title
            }
            ... on SlideshowVideoSlide {
              sys {
                id
              }
              text {
                json
              }
              video {
                url
                width
                height
              }
              videoUrl
              videoHeight
              credit
              title
            }
          }
        }
      }
    }
  }`

  const slideshow = await callContentful(query)

  return {
    props: { slideshow: slideshow.data.imageSliderCollection.items[0] },
    revalidate: 60 * 30,
  }
}

export const getStaticPaths = async () => {
  const query = `{
    imageSliderCollection {
      items {
        slug
      }
    }
  }`

  const slideshows = await callContentful(query)

  const paths = slideshows.data.imageSliderCollection.items.map((slideshow) => {
    return {
      params: {
        slug: slideshow.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: 'blocking', // Creates pages if they don't exist and then stores them...
  }
}

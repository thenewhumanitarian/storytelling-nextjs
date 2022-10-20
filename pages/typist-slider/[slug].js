import { callContentful } from '@utils/contentfulHelper'

import TypistSliderComponent from '@components/typist-slider/typist-slider'

const TypistSlider = ({ typistSlider }) => {
	const { items } = typistSlider.quotesCollection

	return (
		<div className={'w-full overflow-hidden h-auto'}>
			<TypistSliderComponent content={items} />
		</div>
	)
}

export default TypistSlider

export const getStaticProps = async (context) => {
	const slug = context.params.slug

	const query = `{
    typistSliderCollection(limit: 1, where: {slug: "${slug}"}) {
      items {
        quotesCollection {
          items {
            name
            image {
              url
              width
              fileName
              description
              title
              size
              height
            }
            quote
            link
            audio {
              fileName
              size
              url
            }
          }
        }
        sys {
          id
          firstPublishedAt
        }
      }
    }
  }`

	const typistSlider = await callContentful(query)

	return {
		props: { typistSlider: typistSlider.data.typistSliderCollection.items[0] },
		revalidate: 60,
	}
}

export const getStaticPaths = async () => {
	const query = `{
    typistSliderCollection {
      items {
        slug
      }
    }
  }`

	const typistSlider = await callContentful(query)

	const paths = typistSlider.data.typistSliderCollection.items.map((typistSlider) => {
		return {
			params: {
				slug: typistSlider.slug,
			},
		}
	})

	return {
		paths: paths,
		fallback: 'blocking', // Creates pages if they don't exist and then stores them...
	}
}

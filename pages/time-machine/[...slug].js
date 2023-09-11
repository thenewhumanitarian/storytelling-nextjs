import { callContentful } from '@utils/contentfulHelper'
import TimeMachineComponent from '@components/time-machine/time-machine.js'

const TimeMachine = ({ chosenStory, restOfStories, slug }) => {
	return <TimeMachineComponent chosenStory={chosenStory} restOfStories={restOfStories} slug={slug} />
}

export default TimeMachine

export async function getStaticProps({ params }) {
	const slug = params.slug[0]
	const storySlugFromURL = params.slug[1] // Might be undefined if not provided

	// 1. Fetch all stories for the given slug.
	const allStoriesQuery = `
  {
    timeMachineCollection(limit: 1, where: {slug: "${slug}"}) {
      items {
        sys {
          id
        }
        title
        slug
        storiesCollection {
          items {
            ... on TimeMachineStory {
              sys {
                id
              }
              slug
              title
              link
              description
              imageCaption
              imageCredit
              image {
                url
                size
                description
                height
                width
              }
            }
          }
        }
      }
    }
  }`

	const allStoriesResponse = await callContentful(allStoriesQuery)
	const allStories = allStoriesResponse.data.timeMachineCollection.items[0].storiesCollection.items

	// 2. Identify the chosenStory based on the storySlug from the URL or randomly if necessary.
	let chosenStory = allStories.find((story) => story.slug === storySlugFromURL)
	if (!chosenStory) {
		chosenStory = allStories[Math.floor(Math.random() * allStories.length)]
	}

	// 3. Separate the chosenStory from the restOfStories.
	const restOfStories = allStories.filter((story) => story.slug !== chosenStory.slug)

	return {
		props: {
			chosenStory, // This prop has the complete data of the chosen story.
			restOfStories, // This prop has the complete data of the other stories.
      slug
		},
		revalidate: 60 * 60,
	}
}

export const getStaticPaths = async () => {
	const query = `{
    timeMachineCollection {
      items {
        slug
        storiesCollection {
          items {
            ... on TimeMachineStory {
              slug
            }
          }
        }
      }
    }
  }`

	const timeMachines = await callContentful(query)
	let paths = []

	timeMachines.data.timeMachineCollection.items.forEach((timeMachine) => {
		// Path for just the timeMachine slug
		paths.push({
			params: {
				slug: [timeMachine.slug],
			},
		})
		// Paths for each story under the time machine
		timeMachine.storiesCollection.items.forEach((story) => {
			paths.push({
				params: {
					slug: [timeMachine.slug, story.slug],
				},
			})
		})
	})

	return {
		paths: paths,
		fallback: 'blocking',
	}
}

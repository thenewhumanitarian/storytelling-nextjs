import { useEffect, useState } from 'react'

// import { AnimateSharedLayout } from 'framer-motion'
import moment from 'moment'

import FadeInWhenVisible from '@components/timeline/reveal'

// import loadable from '@loadable/component'
// const TimeRangeComponent = loadable(() => import('react-timeline-range-slider'))

import TimelineItem from '@components/timeline/item'

import styles from './timeline.module.css'

const TimelineComponent = ({ content }) => {
  const items = content.events
  const {
    start,
    end,
    showRangeSlider,
    showCategories,
  } = content

  const [error, setError] = useState(false) // Range
  const selectedStart = start ? new Date(start) : new Date('1985-01-01')
  const selectedEnd = end ? new Date(end) : new Date('2021-02-28')
  const [selectedInterval, setSelectedInterval] = useState([
    selectedStart,
    selectedEnd,
  ]) // Selected range
  const [activeCategories, setActiveCategories] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])

  useEffect(() => {
    if (showCategories) {
      let categories = []
      const allCategories = items.map((el) => el.fields.categories)
      for (let i = 0; i < allCategories.length; i++) {
        for (let ii = 0; ii < allCategories[i].length; ii++) {
          let category = allCategories[i][ii].title
          if (categories.indexOf(category) === -1) categories.push(category)
        }
      }
      setActiveCategories([])
      // console.log(activeCategories)
    }
  }, [items]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showCategories && activeCategories.length < 1) {
      let categories = []
      const allCategories = items.map((el) => el.fields.categories)
      // console.log(allCategories)
      for (let i = 0; i < allCategories.length; i++) {
        for (let ii = 0; ii < allCategories[i].length; ii++) {
          let category = allCategories[i][ii].title
          if (categories.indexOf(category) === -1) categories.push(category)
        }
      }
      setAvailableCategories(categories)
    }
  }, [items]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCategory = (string) => {
    if (string === 'show-all') {
      if (availableCategories.length === activeCategories.length) {
        setActiveCategories([])
      } else {
        let newActiveCategories = availableCategories.map((el) => el)
        setActiveCategories(newActiveCategories)
      }
    } else {
      setActiveCategories([string])
    }
  }

  const changeInterval = (interval) => {
    setSelectedInterval(interval)
  }

  const mappedEvents = items
    .filter((el) => moment(el.fields.from).isAfter(moment(selectedInterval[0])))
    .filter((el) =>
      el.fields.to
        ? moment(el.fields.to).isBefore(moment(selectedInterval[1]))
        : true
    )
    .map((el, ii) => {
      // eslint-disable-line
      if (el.fields.categories && showCategories) {
        const linkedCategories = el.fields.categories.map((val) => val.title)
        for (let i = 0; i < linkedCategories.length; i++) {
          if (activeCategories.indexOf(linkedCategories[i]) > -1) {
            return (
              <FadeInWhenVisible key={`fade-in-timeline-item-${ii}`}>
                <TimelineItem data={el.fields} />
              </FadeInWhenVisible>
            )
          }
        }
      } else {
        return (
          <FadeInWhenVisible key={`fade-in-timeline-item-${ii}`}>
            <TimelineItem data={el.fields} />
          </FadeInWhenVisible>
        )
      }
      return null
    })

  const mappedAllEvents = items
    // .sort((a,b) => new Date(a.from) - new Date(b.from))
    .map((el, i) => (
      <FadeInWhenVisible key={`fade-in-timeline-item-${i}`}>
        <TimelineItem data={el.fields} />
      </FadeInWhenVisible>
    ))

  return (
    <div className={'timeline-wrapper'}>
      {/* {content.showRangeSlider && (
        <div className={'max-w-4xl mx-auto mb-8'} style={styles.range}>
          <h3 className={'text-center mb-4'}>Select a time period:</h3>
          <TimeRangeComponent
            error={error}
            ticksNumber={8}
            step={31556952000 / 12} // one year in milliseconds
            selectedInterval={selectedInterval}
            timelineInterval={[new Date(start), new Date(end)]}
            onUpdateCallback={() => setError}
            onChangeCallback={(interval) => changeInterval(interval)}
            formatTick={(ms) => moment(ms).format('Y')}
          />
        </div>
      )} */}
      {/* <AnimateSharedLayout> */}
      <div className={'pl-8 ml-8 border-l-2 border-gray-300'}>
        {/* {items.map((el, i) => {
          return (
            <FadeInWhenVisible key={`fade-in-timeline-item-${i}`}>
              <TimelineItem data={el.fields} />
            </FadeInWhenVisible>
          )
        })} */}
        {!showRangeSlider && !showCategories ? mappedAllEvents : mappedEvents}
      </div>
      {/* </AnimateSharedLayout> */}
    </div>
  )
}

export default TimelineComponent

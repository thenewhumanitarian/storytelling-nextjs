import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'

const FadeInWhenVisible = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
    console.log(inView)
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial='hidden'
      transition={{ duration: 0.6 }}
      variants={{
        hidden: { opacity: 0, x: '-100%' },
        visible: { opacity: 1, x: '0' },
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible

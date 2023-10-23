import { type FC } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

export const transition = {
  initial: {
    opacity: 0.1,
    y: -200
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

interface Props extends HTMLMotionProps<'div'> {

}

const Wave: FC<Props> = ({
  ...props
}) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={transition}
      className='bg-gradient-to-b from-red-400 to-red-300 w-full h-[350px] absolute left-0 top-0 rounded-b-[100px]'
      {...props}
    >
    </motion.div>
  )
}

export default Wave

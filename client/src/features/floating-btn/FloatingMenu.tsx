import { type FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'

import { AddIcon } from '@/icons'
import { type Children } from '@/types'

interface Props {
  children: Children
}

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 }
}

const bgVariants = {
  open: { opacity: 0.65 },
  closed: { opacity: 0 }
}

export const FloatingMenu: FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = useState(false)

  const handleToggleExpand = () => setExpanded(state => !state)

  return (
    <>
      <AnimatePresence>
        {expanded &&
          <motion.div
            onClick={handleToggleExpand}
            initial="closed"
            animate="open"
            exit="closed"
            variants={bgVariants}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed w-[450px] h-[905px] md:rounded-md z-50 bg-black opacity-70'
            )}
          />
        }
      </AnimatePresence>
      <div className={cn('absolute bottom-10 right-6 z-50')}>
        <button
          onClick={handleToggleExpand}
          className={cn('w-[60px] h-[60px] rounded-full center bg-[#766977] shadow-md ')}
        >
          <AddIcon
            className={cn('text-4xl transition-all', expanded ? 'rotate-[135deg]' : '')}
            color='#fff'
          />
        </button>
        <AnimatePresence>
          {expanded &&
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants}
              transition={{ duration: 0.2 }}
              className={cn(
                'mb-2 absolute bottom-[100%] right-0',
                'flex flex-col overflow-hidden'
              )}
            >
              {children}
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  )
}

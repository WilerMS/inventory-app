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

export const FloatingMenu: FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = useState(false)

  const handleToggleExpand = () => setExpanded(state => !state)

  return (
    <div className={cn('absolute bottom-10 right-4 z-50')} >
      <button
        onClick={handleToggleExpand}
        className={cn(
          'w-[70px] h-[70px] rounded-full center bg-white shadow-md border-2'
        )}
      >
        <AddIcon
          className={cn(
            'transition-all',
            expanded ? 'rotate-[45deg]' : ''
          )}
          width={32}
          height={32}
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
              'mb-2 min-w-[220px] absolute bottom-[100%] right-0 rounded-xl p-2',
              'bg-white shadow-md flex flex-col overflow-hidden'
            )}
          >
            {children}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

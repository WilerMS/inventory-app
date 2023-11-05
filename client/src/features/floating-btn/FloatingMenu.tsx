import { type FC, useState } from 'react'
import cn from 'classnames'

import { AddIcon } from '@/icons'
import { type Children } from '@/types'
import { useAppSelector } from '@/redux/hooks'
import { getContrastColor } from '@/utils'
import { StatusBar } from '@/components/lib'

interface Props {
  children: Children
}

export const FloatingMenu: FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = useState(false)
  const user = useAppSelector(state => state.auth.user)

  const handleToggleExpand = () => setExpanded(state => !state)

  return (
    <>
      {expanded &&
        <div
          onClick={handleToggleExpand}
          className={cn(
            'fixed w-screen h-screen top-0 left-0 md:rounded-md z-50 bg-black opacity-70'
          )}
        />
      }
      <div className={cn('absolute bottom-10 right-6 z-50')}>
        <button
          aria-label='Expand menu'
          onClick={handleToggleExpand}
          className={cn('w-[60px] h-[60px] rounded-full center shadow-md ')}
          style={{
            background: user?.color ?? '#766977'
          }}
        >
          <AddIcon
            className={cn('text-4xl transition-all', expanded ? 'rotate-[135deg]' : '')}
            color={getContrastColor(user?.color ?? '#fff')}
          />
        </button>
          {expanded &&
            <>
              <StatusBar color='#585858' />
              <div
                className={cn(
                  'mb-2 absolute bottom-[100%] right-0',
                  'flex flex-col overflow-hidden'
                )}
              >
                {children}
              </div>
            </>
          }
      </div>
    </>
  )
}

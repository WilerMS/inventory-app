import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import { useAppNavigate } from '@/hooks/useAppNavigate'
import { BackIcon, UserIcon } from '@/icons'
import { useAppSelector } from '@/redux/hooks'
import { buildUrl } from '@/constants/env'
import { fadeInOutFromTop } from '@/constants/transition'
import { useHeaderContext } from './HeaderContext'
import { useDetectScroll } from '@/hooks/useDetectScroll'
import SearchBar from './SearchBar'
import { useDebounce } from '@/hooks'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { isHidden, searchEvent } = useHeaderContext()
  const { pathname } = useLocation()
  const { navigate } = useAppNavigate()
  const { state } = useLocation()
  const user = useAppSelector(state => state.auth.user)
  const scrolled = useDetectScroll(100)

  const [searchedText, setSearchedText] = useState('')
  const debouncedSearchedText = useDebounce(searchedText)

  const handleClickUserButton = () => navigate('/profile')
  const handleClickBackButton = () => navigate(state?.previousRoute ?? '/')

  useEffect(() => {
    if (debouncedSearchedText) {
      searchEvent(debouncedSearchedText)
    }
  }, [debouncedSearchedText])

  useEffect(() => {
    setSearchedText('')
  }, [pathname])

  return (
    <AnimatePresence>
      {!isHidden &&
        <motion.header
          initial="initial"
          animate="in"
          exit="out"
          variants={fadeInOutFromTop}
          className={cn(
            'header w-full absolute z-50 h-[75px] p-4 flex items-center',
            !scrolled ? 'bottom-fade bg-white bg-opacity-[0.82] backdrop-blur-md' : ''
          )}
        >
          {pathname !== '/' &&
            <button
              className="mr-2 p-2 rounded-full active:bg-gray-200 transition-all"
              onClick={handleClickBackButton}
            >
              <BackIcon width={24} height={24}/>
            </button>
          }

          <SearchBar value={searchedText} onChange={setSearchedText} />

          {pathname !== '/profile' &&
            <button
              className="center ml-4 w-[35px] h-[35px] rounded-full bg-gray-100 overflow-hidden"
              onClick={handleClickUserButton}
              style={{
                viewTransitionName: 'user-header-button',
                contain: 'layout'
              }}
            >
              {user?.image
                ? <img src={buildUrl(`/images/${user.image}`)} alt="" />
                : <UserIcon />
              }
            </button>
          }

        </motion.header>
      }
    </AnimatePresence>
  )
}

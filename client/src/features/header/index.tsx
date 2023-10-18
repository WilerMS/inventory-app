import { useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import cn from 'classnames'

import { useAppNavigate } from '@/hooks/useAppNavigate'
import { BackIcon, SearchIcon, UserIcon } from '@/icons'
import { useAppSelector } from '@/redux/hooks'

export const Header = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()
  const { navigate } = useAppNavigate()
  const user = useAppSelector(state => state.auth.user)

  const handleClickUserButton = () => navigate('/profile')
  const handleFocusSearchBar = () => ref.current?.focus()
  const handleClickBackButton = useCallback(() => {
    const ROUTES_BACK_PAGES = [
      ['/products', '/'],
      ['/products/', '/products'],
      ['/zones', '/'],
      ['/zones/', '/zones'],
      ['/', null]
    ]
    const path = pathname.replace(/\d+/, '')
    const backRoute = ROUTES_BACK_PAGES
      .find((route) => route[0]?.startsWith(path)) ?? [null, '/']

    navigate(backRoute[1])
  }, [pathname])

  if (['/login', '/register'].includes(pathname)) return null

  return (
    <header className="w-full absolute z-50 h-[75px] p-4 flex items-center bg-opacity-[0.82] backdrop-blur-md">
      {pathname !== '/' &&
        <button
          className="mr-2 p-2 rounded-full active:bg-gray-200 transition-all"
          onClick={handleClickBackButton}
        >
          <BackIcon width={24} height={24}/>
        </button>
      }

      <div
        className={cn(
          'flex-grow h-full rounded-2xl border border-gray-300 flex items-center overflow-hidden px-2'
        )}
      >
        <input
          ref={ref}
          type="text"
          placeholder="Search something..."
          className="w-full h-full outline-none ml-3 bg-transparent"
        />
        <button className="mr-1" onClick={handleFocusSearchBar}>
          <SearchIcon width={20} height={20} />
        </button>
      </div>

      {pathname !== '/profile' &&
        <button
          className="center ml-4 w-[35px] h-[35px] rounded-full bg-gray-100"
          onClick={handleClickUserButton}
          style={{
            viewTransitionName: 'user-header-button',
            contain: 'layout'
          }}
        >
          {user?.image
            ? <img src={`http://localhost:3000/images/${user.image}`} alt="" />
            : <UserIcon />
          }
        </button>
      }

    </header>
  )
}

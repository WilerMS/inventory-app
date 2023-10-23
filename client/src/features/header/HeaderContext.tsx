// HeaderContext.tsx
import { type Children } from '@/types'
import {
  type FC,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

interface HeaderContextProps {
  isHidden: boolean
  hideHeader: () => void
  showHeader: () => void
  searchEvent: (value: string) => void
  setSearchEvent: (func: (value: string) => void) => void
}

interface Props {
  children: Children
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined)

export const HeaderProvider: FC<Props> = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false)
  const [searchEvent, setSetSearchEvent] = useState(() => {
    return (value: string) => {}
  })

  const hideHeader = () => setIsHidden(true)
  const showHeader = () => setIsHidden(false)
  const setSearchEvent = (func: (value: string) => void) => {
    setSetSearchEvent(() => func)
  }

  return (
    <HeaderContext.Provider
      value={{
        isHidden,
        hideHeader,
        showHeader,
        searchEvent,
        setSearchEvent
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeaderContext = () => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useHeaderContext must be used within a HeaderProvider')
  }
  return context
}

export const useHideHeader = () => {
  const { hideHeader, showHeader } = useHeaderContext()

  useEffect(() => {
    hideHeader()
    return () => showHeader()
  }, [])
}

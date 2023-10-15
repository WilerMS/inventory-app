import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'

export const useAppNavigate = () => {
  const navigate = useNavigate()

  const _navigate = (path: any) => {
    if (!document.startViewTransition) {
      navigate(path)
    } else {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(path)
        })
      })
    }
  }

  return {
    navigate: _navigate
  }
}

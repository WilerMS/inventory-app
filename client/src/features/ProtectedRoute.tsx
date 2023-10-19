import { useAppSelector } from '@/redux/hooks'
import { type ElementType, type FC } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  component: ElementType
}

const Protect: FC<Props> = ({ component: Component }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }

  return <Component />
}

export default Protect
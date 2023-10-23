import { useAppNavigate } from '@/hooks/useAppNavigate'
import { type FC, type FormEvent } from 'react'
import { type LinkProps } from 'react-router-dom'

interface Props extends LinkProps {
  to: string
  routeProps?: Record<string, any>
}

const LinkButton: FC<Props> = ({
  to,
  children,
  routeProps,
  ...props
}) => {
  const { navigate } = useAppNavigate()

  const handleClickLink = (e: FormEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(to, routeProps)
  }

  return (
    <a
      href={to}
      onClick={handleClickLink}
      {...props}
    >
      {children}
    </a>
  )
}

export default LinkButton

import { useAppNavigate } from '@/hooks/useAppNavigate'
import { type FC, type FormEvent } from 'react'
import { type LinkProps } from 'react-router-dom'

interface Props extends LinkProps {
  to: string
}

const LinkButton: FC<Props> = ({
  to,
  children,
  ...props
}) => {
  const { navigate } = useAppNavigate()

  const handleClickLink = (e: FormEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(to)
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

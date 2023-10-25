import { type FC } from 'react'

import cn from 'classnames'
import { LinkButton } from '@/components/lib'

interface Props {
  to: string
  icon: JSX.Element
  title: string
  className?: string
}

export const FloatingItem: FC<Props> = ({
  to,
  icon,
  title,
  className
}) => {
  return (
    <LinkButton
      to={to}
      className={cn(
        'flex items-center justify-between w-[230px] cursor-pointer font-bold my-2',
        className
      )}
    >
      <span className='text-white flex-grow text-lg text-right mr-2'>{title}</span>
      <span className='text-2xl w-[40px] h-[40px] mr-[10px] bg-white rounded-full center'>{icon}</span>
    </LinkButton>
  )
}

export default FloatingItem

import { type FC } from 'react'

import cn from 'classnames'
import { LinkButton } from '@/components/lib'

interface Props {
  to: string
  icon: JSX.Element
  title: string
  description: string
  className?: string
}

export const FloatingItem: FC<Props> = ({
  to,
  icon,
  title,
  description,
  className
}) => {
  return (
    <LinkButton
      to={to}
      className={cn(
        'w-full flex items-center p-2 cursor-pointer rounded-lg',
        'hover:bg-slate-100 border-2 border-transparent hover:border-slate-200 transition-all',
        className
      )}
    >
      <span className='text-2xl pl-1 pr-4 cursor-pointer'>{icon}</span>
      <span className='flex flex-col text-left cursor-pointer'>
        <span className='text-md font-bold'>{title}</span>
        <span className='text-sm -mt-1'>{description}</span>
      </span>
    </LinkButton>
  )
}

export default FloatingItem

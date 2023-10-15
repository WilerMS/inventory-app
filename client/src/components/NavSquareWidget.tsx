import { type FC } from 'react'
import cn from 'classnames'

import { useAppNavigate } from '@/hooks/useAppNavigate'

interface Props {
  title: string
  image: string
  path: `/${string}`
  className?: string
  imageAlt?: string
  imgTransitionName?: string
}

const NavSquareWidget: FC<Props> = ({
  title,
  image,
  path,
  className,
  imageAlt,
  imgTransitionName
}) => {
  const { navigate } = useAppNavigate()

  const handleClickArticle = () => navigate(path)

  return (
    <article
      onClick={handleClickArticle}
      className={cn(
        'w-full relative aspect-square shadow rounded-2xl center cursor-pointer',
        'hover:scale-[1.01] transition-all',
        className
      )}
    >
      <img
        src={image}
        alt={imageAlt ?? ''}
        className='w-1/2 h-full -mt-5 object-contain'
        style={{
          viewTransitionName: imgTransitionName,
          contain: 'layout'
        }}
      />
      <div className='absolute h-1/4 bottom-0'>
        <h4 className='text-lg font-bold'>{title}</h4>
      </div>
    </article>
  )
}

export default NavSquareWidget

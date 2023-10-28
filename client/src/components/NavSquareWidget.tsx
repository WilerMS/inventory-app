import { type CSSProperties, type FC } from 'react'
import cn from 'classnames'
import { type AnimationProps, motion } from 'framer-motion'

import { useAppNavigate } from '@/hooks/useAppNavigate'

interface Props extends AnimationProps {
  title: string
  image: string
  path: `/${string}`
  className?: string
  imageAlt?: string
  imgTransitionName?: string
  style?: CSSProperties
}

const NavSquareWidget: FC<Props> = ({
  title,
  image,
  path,
  className,
  imageAlt,
  imgTransitionName,
  ...props
}) => {
  const { navigate } = useAppNavigate()

  const handleClickArticle = () => navigate(path, {
    state: { image }
  })

  return (
    <motion.article
      onClick={handleClickArticle}
      className={cn(
        'w-full relative aspect-square shadow rounded-2xl center cursor-pointer',
        'hover:scale-[1.01] transition-all',
        className
      )}
      {...props}
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
    </motion.article>
  )
}

export default NavSquareWidget

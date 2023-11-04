import { type FC } from 'react'
import cn from 'classnames'

export const transition = {
  initial: {
    opacity: 0.1,
    y: -200
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

interface Props {
  firstColor: string
  secondColor: string
}

const Wave: FC<Props> = ({
  firstColor,
  secondColor,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full h-[350px] absolute left-0 top-0 rounded-b-[100px]'
      )}
      style={{
        background: `linear-gradient(to bottom, ${firstColor}, ${secondColor})`
      }}
      {...props}
    >
    </div>
  )
}

export default Wave

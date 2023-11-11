import { type FC } from 'react'
import { Meta } from 'react-meta-elements'

interface Props {
  color: `#${string}`
}

const StatusBar: FC<Props> = ({ color }) => {
  return (
    <>
      <Meta key={color} name="theme-color" content={color} />
      <Meta key={color} name="apple-mobile-web-app-status-bar-style" content={color} />
      <Meta key={color} name="apple-mobile-web-app-capable" content={color} />
    </>
  )
}

export default StatusBar

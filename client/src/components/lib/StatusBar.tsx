import { type FC } from 'react'
import { Meta } from 'react-meta-elements'

interface Props {
  color: `#${string}`
}

const StatusBar: FC<Props> = ({ color }) => {
  return (
    <>
      <Meta name="theme-color" content={color} />
      <Meta name="apple-mobile-web-app-status-bar-style" content={color} />
      <Meta name="apple-mobile-web-app-capable" content={color} />
    </>
  )
}

export default StatusBar

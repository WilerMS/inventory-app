import { type FC } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  color: `#${string}`
}

const StatusBar: FC<Props> = ({ color }) => {
  return (
    <Helmet>
      <meta name="theme-color" content={color} />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </Helmet>
  )
}

export default StatusBar

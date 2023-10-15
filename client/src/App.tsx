import cn from 'classnames'
import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { Header } from '@/features/header'

const Home = lazy(() => import('@/pages/Home'))
const Product = lazy(() => import('@/pages/Product'))
const Products = lazy(() => import('@/pages/Products'))
const Profile = lazy(() => import('@/pages/Profile'))
const Zone = lazy(() => import('@/pages/Zone'))
const Zones = lazy(() => import('@/pages/Zones'))

export default function App () {
  return (
    <div className={cn('App flex gap-2 justify-center items-center h-[100vh] bg-blue-300')}>
      <div
        className={cn(
          'w-full h-full bg-white overflow-hidden',
          'md:max-h-[900px] md:max-w-[450px] md:shadow-xl md:rounded-md'
        )}
      >
        <Router>
          <Header />
          <Suspense>
            <Routes>
                <Route key='home' path='/' element={<Home />} />
                <Route key='product' path='/products/:productId' element={<Product />} />
                <Route key='products' path='/products' element={<Products />} />
                <Route key='profile' path='/profile' element={<Profile />} />
                <Route key='zone' path='/zones/:zoneId' element={<Zone />} />
                <Route key='zones' path='/zones' element={<Zones />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>
  )
}

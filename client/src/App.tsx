import cn from 'classnames'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { Protect } from '@/features/ProtectedRoute'
import { Header } from '@/features/header'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Profile = lazy(() => import('@/pages/Profile'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Product = lazy(() => import('@/pages/Products/Product'))
const Products = lazy(() => import('@/pages/Products/Products'))
const Login = lazy(() => import('@/pages/AuthPages/Login'))
const Register = lazy(() => import('@/pages/AuthPages/Register'))
const Shopping = lazy(() => import('@/pages/Shopping/Shopping'))

const Zone = lazy(() => import('@/pages/Zones/Zone'))
const Zones = lazy(() => import('@/pages/Zones/Zones'))
const ZoneManager = lazy(() => import('@/pages/Zones/ZoneManager'))

export default function App () {
  return (
    <div className={cn('App flex gap-2 justify-center items-center h-[100vh] bg-blue-300')}>
      <div
        className={cn(
          'w-full h-full bg-white overflow-hidden relative',
          'md:w-[900px] md:max-h-[900px] md:max-w-[450px] md:shadow-xl md:rounded-md'
        )}
      >
        <Router>
          <Header />
          <Suspense>
            <Routes>
              <Route key='login' path='/login' element={<Login />} />
              <Route key='register' path='/register' element={<Register />} />

              <Route key='home' path='/' element={<Protect component={Home} />} />
              <Route key='product' path='/products/:productId' element={<Protect component={Product} />} />
              <Route key='products' path='/products' element={<Protect component={Products} />} />
              <Route key='profile' path='/profile' element={<Protect component={Profile} />} />
              <Route key='zone' path='/zones/:zoneId' element={<Protect component={Zone} />} />
              <Route key='zones' path='/zones' element={<Protect component={Zones} />} />
              <Route key='zones' path='/zones/:zoneId/edit' element={<Protect component={ZoneManager} />} />
              <Route key='zones' path='/zones/create' element={<Protect component={ZoneManager} />} />
              <Route key='shopping-list' path='/shopping-list' element={<Protect component={Shopping} />} />

              <Route key='notfound' path='*' element={<NotFound />} />

            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>
  )
}

import cn from 'classnames'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { Protect } from './features/ProtectedRoute'
import { Header } from '@/features/header'
import { FloatingActionButton } from '@/features/floating-btn'
import {
  Product,
  Products,
  Profile,
  Home,
  Login,
  NotFound,
  Register,
  Shopping,
  Zone,
  Zones
} from '@/pages'

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
          <FloatingActionButton />
          <Routes>
            <Route key='login' path='/login' element={<Login />} />
            <Route key='register' path='/register' element={<Register />} />

            <Route key='home' path='/' element={<Protect component={Home} />} />
            <Route key='product' path='/products/:productId' element={<Protect component={Product} />} />
            <Route key='products' path='/products' element={<Protect component={Products} />} />
            <Route key='profile' path='/profile' element={<Protect component={Profile} />} />
            <Route key='zone' path='/zones/:zoneId' element={<Protect component={Zone} />} />
            <Route key='zones' path='/zones' element={<Protect component={Zones} />} />
            <Route key='shopping-list' path='/shopping-list' element={<Protect component={Shopping} />} />

            <Route key='notfound' path='*' element={<NotFound />} />

          </Routes>
        </Router>
      </div>
    </div>
  )
}

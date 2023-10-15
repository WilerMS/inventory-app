import cn from 'classnames'
import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { Header } from '@/features/header'
import { FloatingActionButton } from './features/floating-btn'
import Home from '@/pages/Home'
import Product from '@/pages/Product'
import Products from '@/pages/Products'
import Profile from '@/pages/Profile'
import Zone from '@/pages/Zone'
import Zones from '@/pages/Zones'
import Shopping from '@/pages/Shopping'

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
            <Route key='home' path='/' element={<Home />} />
            <Route key='product' path='/products/:productId' element={<Product />} />
            <Route key='products' path='/products' element={<Products />} />
            <Route key='profile' path='/profile' element={<Profile />} />
            <Route key='zone' path='/zones/:zoneId' element={<Zone />} />
            <Route key='zones' path='/zones' element={<Zones />} />
            <Route key='shopping-list' path='/shopping-list' element={<Shopping />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

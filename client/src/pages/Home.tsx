import productsImage from '@/assets/products-2.png'
import storageImage from '@/assets/product-cart.png'
import shoppingImage from '@/assets/list.png'
import elipsisImage from '@/assets/elipsis.png'
import cn from 'classnames'
import NavSquareWidget from '@/components/NavSquareWidget'

export default function Home () {
  return (
    <main className='w-full h-full pt-[80px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
      <section className="mb-4">
        <div
          className={cn(
            'w-full h-[170px] rounded-2xl',
            'bg-gradient-to-b from-slate-600 to-slate-700'
          )}
        >
        </div>
      </section>

      <section>
        <h3 className="text-xl ml-1 mb-2 font-bold">Sections</h3>
        <div className="w-full grid grid-cols-2 gap-4">

          <NavSquareWidget
            title='Products'
            image={productsImage}
            path='/products'
            imageAlt='Product section'
            className='bg-gradient-to-b from-lime-100 to-lime-200'
            imgTransitionName='products-image'
          />

          <NavSquareWidget
            title='Storage areas'
            image={storageImage}
            path='/zones'
            imageAlt='Storage areas'
            className='bg-gradient-to-b from-fuchsia-100 to-fuchsia-200'
            imgTransitionName='storage-image'
          />

          <NavSquareWidget
            title='Shopping list'
            image={shoppingImage}
            path='/shopping-list'
            imageAlt='Shopping list'
            className='bg-gradient-to-b from-rose-100 to-rose-200'
            imgTransitionName='shopping-list-image'
          />

          <NavSquareWidget
            title='Coming soon'
            image={elipsisImage}
            path='/shopping-list'
            imageAlt='Coming soon'
            className='bg-gradient-to-b from-gray-100 to-gray-200 opacity-40 hover:scale-100'
          />

        </div>
      </section>
    </main>
  )
}

import cn from 'classnames'

import productsImage from '@/assets/products-2.png'

export default function Zone () {
  return (
    <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
      <section className="mb-4">
        <div
          className={cn(
            'w-full h-[250px] center flex-col'
          )}
        >
          <div className='border-4 border-[#81c784] aspect-square center flex-col p-10 rounded-full'>
            <img
              className='w-[120px]'
              src={productsImage}
              alt="Products"
              style={{
                viewTransitionName: 'products-image',
                contain: 'layout'
              }}
            />
          </div>
        </div>
      </section>

    </main>
  )
}

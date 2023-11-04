import cn from 'classnames'

import productsImage from '@/assets/products-2.png'
import { FloatingItem, FloatingMenu } from '@/features/floating-btn'
import { FoodIcon } from '@/icons'
import ProductItem from './ProductItem'
import { type ProductInterface } from '@/types'
import { buildUrl } from '@/constants/env'
import { useHeaderContext } from '@/features/header/HeaderContext'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import folderImage from '@/assets/folder.png'

export default function Products () {
  const { setSearchEvent } = useHeaderContext()
  const fetchZones = () => api<ProductInterface[]>(buildUrl('/products'))
  const { data } = useQuery({ queryKey: ['products'], queryFn: fetchZones })

  const [filter, setFilter] = useState('')

  useEffect(() => {
    const func = (value: string) => {
      console.log({ value })
      setFilter(value)
    }
    setSearchEvent(func)
  }, [])

  const products = data?.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <FloatingMenu>
        <FloatingItem
          to='/products/create'
          icon={<FoodIcon />}
          title='New Product'
        />
      </FloatingMenu>
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
        <section>
          <h3 className="text-xl ml-1 mb-2 font-bold">Products</h3>
          {!!data &&
            <div className="w-full grid grid-cols-1 gap-4">
              {products?.map((product) => (
                <ProductItem
                  {...product}
                  key={product.id}
                  image={product.image ? buildUrl(`/images/${product.image}`) : folderImage}
                />
              ))}
            </div>
          }
        </section>
      </main>
    </>
  )
}

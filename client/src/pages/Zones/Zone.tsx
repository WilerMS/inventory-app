import { motion } from 'framer-motion'
import { useLocation, useParams } from 'react-router-dom'

import folderImage from '@/assets/folder.png'
import productsImage from '@/assets/products-2.png'

import { framerContainerVariant } from '@/constants/transition'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { buildUrl } from '@/constants/env'
import { type ZoneInterface } from '@/types'
import { FoodIcon, PenIcon } from '@/icons'
import { LinkButton } from '@/components/lib'
import ProductItem from '../Products/ProductItem'
import { FloatingItem, FloatingMenu } from '@/features/floating-btn'

export default function Zone () {
  const { zoneId } = useParams()
  const { state } = useLocation()
  const fetchZone = () => api<ZoneInterface>(buildUrl(`/zones/${zoneId}/products`))
  const { data: zoneFetched } = useQuery({
    queryKey: ['zones', zoneId],
    queryFn: fetchZone
  })

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
      <figure className='relative w-full h-[220px] center flex-col mt-4 mb-3'>
          <picture
            className=' group w-[200px] h-[200px] overflow-hidden center rounded-full'
            style={{
              viewTransitionName: `zone-image-${zoneId}`,
              content: 'layout'
            }}
          >
            {zoneFetched?.image
              ? <img className='w-full h-full object-cover' src={buildUrl(`/images/${zoneFetched.image}`)} />
              : <img className='w-full h-full object-cover' src={state?.image ? state.image : folderImage} />
            }
          </picture>
        </figure>
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="capitalize text-2xl ml-1 mb-2 font-bold">{zoneFetched?.name}</h3>
            <LinkButton
              to={`/zones/${zoneId}/edit`}
              className='p-2 mb-1 bg-slate-700 rounded-full'
            >
              <PenIcon className='text-2xl' color='#fff' />
            </LinkButton>
          </div>
          <motion.div
            className="w-full grid grid-cols-1 gap-4"
            variants={framerContainerVariant}
            initial="hidden"
            animate="show"
          >
            {!!zoneFetched &&
              <motion.div
                className="w-full grid grid-cols-1 gap-4"
                variants={framerContainerVariant}
                initial="hidden"
                animate="show"
              >
                {zoneFetched.products?.map((product) => (
                  <ProductItem
                    {...product}
                    key={product.id}
                    image={product.image ? buildUrl(`/images/${product.image}`) : productsImage}
                  />
                ))}
              </motion.div>
            }

          </motion.div>
        </section>

      </main>
    </>
  )
}

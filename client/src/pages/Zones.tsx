import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

import storageImage from '@/assets/product-cart.png'
import folderImage from '@/assets/folder.png'
import NavSquareWidget from '@/components/NavSquareWidget'
import { api } from '@/services/api'
import { type ZoneInterface } from '@/types'
import { buildUrl } from '@/constants/env'
import { framerContainerVariant, framerItemVariant } from '@/constants/transition'

export default function Zones () {
  const fetchZones = async () => await api<ZoneInterface[]>(buildUrl('/zones'))
  const { data } = useQuery({ queryKey: ['zones'], queryFn: fetchZones })

  return (
    <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
      <section className="mb-4">
        <div className='w-full h-[250px] center flex-col'>
          <div className='border-4 border-[#d5887a] aspect-square center flex-col p-10 rounded-full'>
            <img
              className='w-[120px]'
              src={storageImage}
              alt="Storage area"
              style={{
                viewTransitionName: 'storage-image',
                contain: 'layout'
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-xl ml-1 mb-2 font-bold">Storage areas</h3>
        {!!data &&
          <motion.div
            className="w-full grid grid-cols-2 gap-4"
            variants={framerContainerVariant}
            initial="hidden"
            animate="show"
          >
            {data?.map((zone) => (
              <NavSquareWidget
                variants={framerItemVariant}
                key={zone.id}
                title={zone.name}
                image={zone.image ? buildUrl(`/images/${zone.image}`) : folderImage}
                path={`/zones/${zone.id}`}
                imageAlt={zone.name}
                imgTransitionName={`zone-image-${zone.id}`}
                className='bg-gradient-to-b from-lime-100 to-lime-200'
              />
            ))}

          </motion.div>
        }
      </section>
    </main>
  )
}

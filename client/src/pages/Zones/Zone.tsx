import { motion } from 'framer-motion'
import { useLocation, useParams } from 'react-router-dom'

import folderImage from '@/assets/folder.png'
import { framerContainerVariant } from '@/constants/transition'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { buildUrl } from '@/constants/env'
import { type ZoneInterface } from '@/types'
import { PenIcon } from '@/icons'
import { LinkButton } from '@/components/lib'

export default function Zone () {
  const { zoneId } = useParams()
  const { state } = useLocation()
  const fetchZones = () => api<ZoneInterface>(buildUrl(`/zones/${zoneId}`))
  const { data: zoneFetched } = useQuery({
    queryKey: ['zones', zoneId],
    queryFn: fetchZones
  })

  return (
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
        <div className="flex items-center justify-between">
          <h3 className="capitalize text-2xl ml-1 mb-2 font-bold">{zoneFetched?.name}</h3>
          <LinkButton
            to={`/zones/${zoneId}/edit`}
            className='p-2 mb-1 bg-slate-700 rounded-full'
          >
            <PenIcon className='text-2xl' color='#fff' />
          </LinkButton>
        </div>
        <motion.div
          className="w-full grid grid-cols-2 gap-4"
          variants={framerContainerVariant}
          initial="hidden"
          animate="show"
        >

        </motion.div>
      </section>

    </main>
  )
}

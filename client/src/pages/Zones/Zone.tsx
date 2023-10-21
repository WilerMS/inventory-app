import cn from 'classnames'
import { motion } from 'framer-motion'

import folderImage from '@/assets/folder.png'
import { useParams } from 'react-router-dom'
import { framerContainerVariant } from '@/constants/transition'

export default function Zone () {
  const { zoneId } = useParams()

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
              src={folderImage}
              alt="Products"
              style={{
                viewTransitionName: `zone-image-${zoneId}`,
                contain: 'layout'
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-xl ml-1 mb-2 font-bold">Zone {zoneId} products:</h3>
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

import storageImage from '@/assets/product-cart.png'
import NavSquareWidget from '@/components/NavSquareWidget'
import { api } from '@/services/api'
import { type ZoneInterface } from '@/types'
import { useQuery } from '@tanstack/react-query'

export default function Zones () {
  const fetchZones = async () => {
    return await api<ZoneInterface[]>('http://localhost:3000/zones')
  }

  const { data } = useQuery({
    queryKey: ['zones', 'list'],
    queryFn: fetchZones
  })

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
        <div className="w-full grid grid-cols-2 gap-4">
          {data?.map((zone) => (
            <NavSquareWidget
              key={zone.id}
              title={zone.name}
              image={zone.image ? `http://localhost:3000/images/${zone.image}` : storageImage}
              path={`/zones/${zone.id}`}
              imageAlt={zone.name}
              imgTransitionName={`zone-${zone.id}-image`}
              className='bg-gradient-to-b from-lime-100 to-lime-200'
            />
          ))}

        </div>
      </section>
    </main>
  )
}

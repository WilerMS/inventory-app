import cn from 'classnames'
import productsImage from '@/assets/products-2.png'
import { type ProductInterface } from '@/types'
import { type FC } from 'react'
import { useAppNavigate } from '@/hooks'

interface Props extends ProductInterface {

}

const ProductItem: FC<Props> = ({
  id,
  name,
  amount,
  image,
  notes
}) => {
  const { navigate } = useAppNavigate()

  const handleClickProduct = () => navigate(`/products/${id}`)

  return (
    <article
      onClick={handleClickProduct}
      className={cn(
        'w-full pl-4 pr-2 py-4 relative aspect-[5] shadow border border-gray-100 rounded-2xl cursor-pointer',
        'flex items-center'
      )}
    >
      <picture className='flex-shrink-0 w-16 h-16'>
        <img
          src={image ?? productsImage}
          className='object-cover aspect-square rounded-full mr-4'
        />
      </picture>
      <div className="w-full overflow-hidden px-3">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p
          title={notes ?? 'No description provided'}
          className="text-gray-500 text-sm leading-4 w-full truncate"
        >
            {notes ?? 'No description provided'}
        </p>
      </div>
      <button
        aria-label='Product units'
        className={cn(
          'text-black flex-shrink-0 w-[40px] h-[40px] rounded-full',
          'center  flex-col'
        )}
      >
        <span className='font-bold'>{amount}</span>
        <span className='text-xs'>units</span>
      </button>
    </article>
  )
}

export default ProductItem

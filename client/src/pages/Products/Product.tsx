import cn from 'classnames'

import { BackIcon } from '@/icons'
import { useAppNavigate } from '@/hooks'
import { Input, StatusBar, Textarea, Wave } from '@/components/lib'
import { type FormEvent, useState, useEffect } from 'react'
import { type ZoneInterface, type ProductInterface } from '@/types'
import Alert from '@/components/lib/Alert'

import folderImage from '@/assets/folder.png'
import { useHideHeader } from '@/features/header/HeaderContext'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api, apiFiles } from '@/services/api'
import { buildUrl } from '@/constants/env'
import FileInput from '@/components/lib/Uploader'
import { getContrastColor, getCurrentDate } from '@/utils'
import useProduct from './useProduct'
import Amount from '@/components/lib/Amount'
import Select from '@/components/lib/Select'

type FormControlType = FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export default function Product () {
  useHideHeader()
  const { navigate } = useAppNavigate()
  const { productId } = useParams()
  const { isSuccess, isLoading, error, postProduct, putProduct } = useProduct()

  /* fetch current product data */
  const fetchProduct = async () => await api<ProductInterface>(buildUrl(`/products/${productId}`))
  const { data: productFetched } = useQuery({
    queryKey: ['products', productId],
    queryFn: fetchProduct,
    enabled: !!productId
  })

  const fetchZones = () => api<ZoneInterface[]>(buildUrl('/zones'))
  const { data: zones } = useQuery({ queryKey: ['zones'], queryFn: fetchZones })

  const [productData, setProductData] = useState<Omit<ProductInterface, 'id' | 'user_id'>>({
    name: '',
    amount: 1,
    zone_id: 0,
    expiration_date: getCurrentDate(),
    image: '',
    notes: '',
    price: 0
  })

  useEffect(() => {
    if (productFetched) {
      setProductData({
        name: productFetched?.name,
        amount: productFetched?.amount,
        zone_id: productFetched?.zone_id,
        expiration_date: productFetched?.expiration_date ?? getCurrentDate(),
        image: productFetched?.image ?? '',
        notes: productFetched?.notes ?? '',
        price: productFetched?.price ?? 0
      })
    }
  }, [productFetched])

  const handleClickBackButton = () => navigate(-1)
  const handleChange = (e: FormControlType) => setProductData({
    ...productData,
    [e.currentTarget.name]: e.currentTarget.value
  })
  const handleChangeNumber = (e: FormControlType) => setProductData({
    ...productData,
    [e.currentTarget.name]: Number(e.currentTarget.value)
  })
  const handleSubmitZone = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (productId) {
      return putProduct({
        ...productData,
        id: Number(productId)
      })
    }

    return postProduct({
      ...productData
    })
  }
  const handleChangeImage = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return apiFiles<{ filename: string }>(
      buildUrl('/files'),
      {
        method: 'POST',
        body: formData
      }
    ).then(data => {
      setProductData({
        ...productData,
        image: data.filename
      })
    })
  }
  const handleChangeAmount = (value: number) => {
    setProductData({
      ...productData,
      amount: value
    })
  }

  return (
    <>
      <StatusBar color={productFetched?.color ?? '#2a7964'} />
      <button
        aria-label='Go back'
        className="absolute top-4 left-4 z-50 mr-2 p-2"
        onClick={handleClickBackButton}
      >
        <BackIcon width={26} height={26} color={getContrastColor(productFetched?.color ?? '#00000')} />
      </button>
      <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-x-hidden scroll-bar-hide relative'>
        <Wave firstColor={productFetched?.color ?? '#2a7964'} secondColor={productFetched?.color ?? '#2a7964'} />
        <figure className={cn('relative w-full h-[220px] center flex-col')}>
          <picture className=' group w-[200px] h-[200px] overflow-hidden center rounded-full'>
            {productData?.image
              ? <img className='w-full h-full object-cover' src={buildUrl(`/images/${productData.image}`)} />
              : <img className='w-[120px]' src={folderImage} alt="Zone" />
            }
            <FileInput
              className='group-hover:opacity-80 absolute opacity-0'
              onChange={handleChangeImage}
              acceptedExt={['image/png', 'image/jpeg', 'image/jpg']}
            />
          </picture>
        </figure>

        <section className='mt-[80px]'>
          <form className='px-2' onSubmit={handleSubmitZone}>
            <Input
              id='name'
              label='Name'
              name='name'
              className='mb-4'
              disabled={isLoading}
              value={productData.name}
              onChange={handleChange}
            />

            <Select
              id='zone_id'
              label='Zone'
              name='zone_id'
              className='mb-4'
              disabled={isLoading}
              value={productData.zone_id}
              onChange={handleChangeNumber}
              options={zones?.map(zone => ({ label: zone.name, value: zone.id })) ?? []}
            />

            <Amount
              id='amount'
              bgcolor={productFetched?.color ?? '#2a7964'}
              textcolor={getContrastColor(productFetched?.color ?? '#2a7964')}
              label='Amount'
              value={productData.amount}
              onChange={handleChangeAmount}
            />

            <Input
              id='price'
              label='Price'
              name='price'
              type='number'
              className='mb-4'
              disabled={isLoading}
              value={productData.price}
              pattern='\d*'
              onChange={handleChangeNumber}
            />

            <Textarea
              id='notes'
              label='Notes'
              name='notes'
              value={productData.notes ?? ''}
              disabled={isLoading}
              className='mb-4'
              onChange={handleChange}
            />

            <Input
              id='expiration_date'
              label='Expiration date'
              type='date'
              name='expiration_date'
              disabled={isLoading}
              value={productData?.expiration_date}
              className='mb-4'
              onChange={handleChange}
            />

            {!!error &&
              <Alert
                variant='danger'
                description={error.message}
              />
              }
            {!!isSuccess &&
              <Alert
                variant='success'
                description={'Note saved successfully'}
              />
            }

            <button
              aria-label='Save product'
              className={cn('center relative w-full rounded-md h-[50px] font-bold text-lg')}
              style={{
                background: productFetched?.color ?? '#2a7964',
                color: getContrastColor(productFetched?.color ?? '#2a7964')
              }}
            >
              <span>Save</span>
            </button>
          </form>
        </section>

      </main>
  </>
  )
}

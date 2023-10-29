import cn from 'classnames'

import { BackIcon } from '@/icons'
import { useAppNavigate } from '@/hooks'
import { Input, StatusBar, Textarea, Wave } from '@/components/lib'
import { type FormEvent, useState, useEffect } from 'react'
import { type ZoneInterface } from '@/types'
import Alert from '@/components/lib/Alert'

import folderImage from '@/assets/folder.png'
import { useHideHeader } from '@/features/header/HeaderContext'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api, apiFiles } from '@/services/api'
import { buildUrl } from '@/constants/env'
import FileInput from '@/components/lib/Uploader'
import { getContrastColor } from '@/utils'
import useZone from './useZone'

type FormControlType = FormEvent<HTMLInputElement | HTMLTextAreaElement>

export default function ZoneManager () {
  useHideHeader()
  const { navigate } = useAppNavigate()
  const { zoneId } = useParams()
  const { isSuccess, isLoading, error, postZone, putZone } = useZone()
  const fetchZones = async () => await api<ZoneInterface>(buildUrl(`/zones/${zoneId}`))
  const { data: zoneFetched } = useQuery({
    queryKey: ['zones', zoneId],
    queryFn: fetchZones,
    enabled: !!zoneId
  })
  const [zoneData, setZoneData] = useState<Omit<ZoneInterface, 'id' | 'user_id'>>({
    name: '',
    notes: '',
    image: ''
  })

  useEffect(() => {
    if (zoneFetched) {
      setZoneData({
        name: zoneFetched.name,
        notes: zoneFetched.notes,
        image: zoneFetched.image
      })
    }
  }, [zoneFetched])

  const handleClickBackButton = () => navigate(-1)
  const handleChange = (e: FormControlType) => setZoneData({
    ...zoneData,
    [e.currentTarget.name]: e.currentTarget.value
  })
  const handleSubmitZone = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (zoneId) {
      return putZone({
        ...zoneData,
        id: Number(zoneId)
      })
    }

    return postZone({
      ...zoneData
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
      setZoneData({
        ...zoneData,
        image: data.filename
      })
    })
  }

  return (
    <>
      <StatusBar color={zoneFetched?.color ?? '#2a7964'} />
      <button
        className="absolute top-4 left-4 z-50 mr-2 p-2"
        onClick={handleClickBackButton}
      >
        <BackIcon width={26} height={26} color={getContrastColor(zoneFetched?.color ?? '#00000')} />
      </button>
      <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
        <Wave firstColor={zoneFetched?.color ?? '#2a7964'} secondColor={zoneFetched?.color ?? '#2a7964'} />
        <figure className={cn('relative w-full h-[220px] center flex-col')}>
          <picture className=' group w-[200px] h-[200px] overflow-hidden center rounded-full'>
            {zoneData?.image
              ? <img className='w-full h-full object-cover' src={buildUrl(`/images/${zoneData.image}`)} />
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
              value={zoneData.name}
              onChange={handleChange}
            />

            <Textarea
              id='notes'
              label='Full name'
              name='notes'
              value={zoneData.notes ?? ''}
              disabled={isLoading}
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
              className={cn('center relative w-full rounded-md h-[50px] font-bold text-lg')}
              style={{
                background: zoneFetched?.color ?? '#2a7964',
                color: getContrastColor(zoneFetched?.color ?? '#2a7964')
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

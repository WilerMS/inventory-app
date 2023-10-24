import cn from 'classnames'

import { BackIcon } from '@/icons'
import { useAppNavigate } from '@/hooks'
import { Input, Textarea, Wave } from '@/components/lib'
import { type FormEvent, useState } from 'react'
import { type ZoneInterface } from '@/types'
import Alert from '@/components/lib/Alert'

import folderImage from '@/assets/folder.png'
import { useHideHeader } from '@/features/header/HeaderContext'

type FormControlType = FormEvent<HTMLInputElement | HTMLTextAreaElement>

export default function ZoneManager () {
  useHideHeader()
  const { navigate } = useAppNavigate()
  const [userData, setUserData] = useState<Omit<ZoneInterface, 'id' | 'user_id'>>({
    name: '',
    notes: '',
    image: ''
  })

  const handleClickBackButton = () => navigate('../')
  const handleChange = (e: FormControlType) => setUserData({
    ...userData,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleSubmitZone = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Zone sent')
  }

  return (
    <>
      <button
        className="absolute top-4 left-4 z-50 mr-2 p-2"
        onClick={handleClickBackButton}
      >
        <BackIcon width={26} height={26}/>
      </button>
      <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
        <Wave />
        <section className="mb-4">
          <div
            className={cn(
              'w-full h-[250px] center flex-col'
            )}
          >
            <div className='z-10 border-4 border-[#81c784] aspect-square center flex-col p-10 rounded-full'>
              <img
                className='w-[120px]'
                src={folderImage}
                alt="Products"
              />
            </div>
          </div>
        </section>

        <section className='mt-[80px]'>
          <form className='px-2' onSubmit={handleSubmitZone}>
            <Input
              id='name'
              label='Name'
              name='name'
              className='mb-4'
              value={''}
              onChange={handleChange}
            />

            <Textarea
              id='notes'
              label='Full name'
              name='notes'
              value={userData.name}
              className='mb-4'
              onChange={handleChange}
            />

            {!!false && <Alert variant='danger' description={'error.message'} />}
            {!!false && <Alert variant='success' description={'data.message'} />}

            <button
              className={cn(
                'bg-red-400 text-white w-full rounded-md h-[50px] hover:bg-red-600',
                'disabled:bg-red-300',
                'center relative'
              )}
            >
              <span>Update</span>
            </button>
          </form>
        </section>

      </main>
  </>
  )
}

import cn from 'classnames'

import { BackIcon, LogoutIcon, UserIcon } from '@/icons'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useAppNavigate, useAuthentication } from '@/hooks'
import { buildUrl } from '@/constants/env'
import { Input } from '@/components/lib'
import { type FormEvent, useState } from 'react'
import { type UserInterface } from '@/types'
import DualSwitch from '@/components/lib/DualSwitch'
import Alert from '@/components/lib/Alert'
import FileInput from '@/components/lib/Uploader'
import { apiFiles } from '@/services/api'
import { modifyUserAction } from '@/redux/features/authReducer'

interface UserProfileType extends Partial<UserInterface> {
  password: string
}

export default function Profile () {
  const { navigate } = useAppNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const { data, error, logout, modifyUser, isLoading } = useAuthentication()
  const [userData, setUserData] = useState<UserProfileType>({
    ...user,
    password: ''
  })

  const handleClickBackButton = () => navigate('../')
  const handleChange = (e: FormEvent<HTMLInputElement>) => setUserData({
    ...userData,
    [e.currentTarget.name]: e.currentTarget.value
  })
  const handleChangeGender = (value: UserInterface['gender']) => setUserData({
    ...userData,
    gender: value
  })
  const handleChangeImage = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return apiFiles<{ message: string }>(
      buildUrl('/files/user-photo'),
      {
        method: 'PUT',
        body: formData
      }
    ).then(data => {
      // @ts-expect-error
      dispatch(modifyUserAction(data.user))
    })
  }

  const handleSubmitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return modifyUser(userData)
  }

  return (
    <>
      <button
        className="absolute top-4 left-4 z-50 mr-2 p-2"
        onClick={handleClickBackButton}
      >
        <BackIcon width={26} height={26}/>
      </button>
      <button
        className="absolute top-4 right-4 z-50 p-2"
        onClick={logout}
      >
        <LogoutIcon width={28} height={28} />
      </button>
      <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
        <div className='bg-gradient-to-b from-red-400 to-red-300 w-full h-[350px] absolute left-0 top-0 rounded-b-[100px]'></div>
        <section className="mb-4">
          <figure className={cn('relative w-full h-[220px] center flex-col')}>
            <picture
              className=' group w-[200px] h-[200px] center overflow-hidden border-2 border-[#002f41] bg-gray-100 aspect-square center flex-col rounded-full'
              style={{
                viewTransitionName: 'user-header-button',
                contain: 'layout'
              }}
            >
              {user?.image
                ? <img src={buildUrl(`/images/${user.image}`)} alt="" />
                : <UserIcon width={70} height={70} color='#002f41' />
              }
              <FileInput
                className='group-hover:opacity-80 absolute opacity-0'
                onChange={handleChangeImage}
                acceptedExt={['image/png', 'image/jpeg', 'image/jpg']}
              />
            </picture>
            <figcaption className="z-40 mt-4 -mb-10 text-center font-bold text-2xl">{user?.username}</figcaption>
          </figure>
        </section>

        <section className='mt-[80px]'>
          <form className='px-2' onSubmit={handleSubmitProfile}>
            <Input
              id='username'
              label='Username'
              name='username'
              className='mb-4'
              value={userData.username}
              disabled
              onChange={handleChange}
            />

            <Input
              id='name'
              label='Full name'
              name='name'
              value={userData.name}
              className='mb-4'
              disabled={isLoading}
              onChange={handleChange}
            />

            <Input
              id='password'
              label='Password'
              name='password'
              value={userData.password}
              placeholder='•••••••••••'
              className='mb-4'
              disabled={isLoading}
              onChange={handleChange}
            />

            <DualSwitch
              id='gender'
              value={userData.gender}
              label='Gender'
              color='bg-red-400'
              option1='male'
              option2='female'
              disabled={isLoading}
              onChange={handleChangeGender}
              className='mb-4'
            />

            <Input
              id='birth_date'
              label='Birth date'
              type='date'
              name='birth_date'
              disabled={isLoading}
              value={userData.birth_date}
              className='mb-4'
              onChange={handleChange}
            />

            {!!error && <Alert variant='danger' description={error.message} />}
            {!!data && <Alert variant='success' description={data.message} />}

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

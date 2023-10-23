import { type FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import classNames from 'classnames'

import Alert from '@/components/lib/Alert'
import logo from '@/assets/inventory.png'
import { Input, LinkButton } from '@/components/lib'
import { useAuthentication } from '@/hooks'
import { LoaderIcon } from '@/icons'
import { useHideHeader } from '@/features/header/HeaderContext'

export default function Register () {
  useHideHeader()
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    password: '',
    'repeat-password': ''
  })
  const [validationError, setValidationError] = useState<string>()
  const { data, isLoading, isAuthenticated, error, register } = useAuthentication()

  const handleChange = (e: FormEvent<HTMLInputElement>) => setUserData({
    ...userData,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userData.password !== userData['repeat-password']) {
      setValidationError('Passwords must match')
      return
    }

    setValidationError(undefined)

    const dataToSend = { ...userData, 'repeat-password': undefined }
    return register(dataToSend)
  }

  if (isAuthenticated) return <Navigate to={'/'} replace />

  return (
    <main className='w-full h-full  flex flex-col'>
      <div
        className={classNames(
          'w-full h-[150px] relative rounded-b-[150px] bg-[#192543] flex justify-center',
          'bg-gradient-to-b from-[#192543] to-[#253561]'
        )}
      >
        <div
          className={classNames(
            'w-[150px] h-[150px] absolute  bottom-[-60px] center',
            'bg-gradient-to-r from-[#e7eeff] to-[#c8d7ff]',
            'rounded-full shadow-xl shadow-[#0000000c]'
          )}
          style={{
            viewTransitionName: 'login-app-logo',
            contain: 'layout'
          }}
        >
          <img className='w-1/2' src={logo} alt="Inventory app logo" />
        </div>
      </div>

      <section id='login' className='mt-[40px] p-8 rounded-lg'>
        <div
          className='text-center'
          style={{
            viewTransitionName: 'login-app-name',
            contain: 'layout'
          }}
        >
          <h2 className='text-4xl font-bold'>Sign up</h2>
          <h3 className='mb-4 mt-2'>Access credentials</h3>
        </div>
        <form onSubmit={handleSubmitRegister}>
          <Input
            label='Username'
            wrapperClass='mb-5'
            required
            id='username'
            name='username'
            placeholder='Your username here...'
            autoComplete='off'
            onChange={handleChange}
            disabled={isLoading || !!data}
            wrapperStyle={{
              viewTransitionName: 'login-app-input-username',
              contain: 'layout'
            }}
          />

          <Input
            label='Full name'
            wrapperClass='mb-5'
            required
            id='name'
            name='name'
            placeholder='Your name here...'
            autoComplete='off'
            onChange={handleChange}
            disabled={isLoading || !!data}
          />

          <Input
            label='Password'
            wrapperClass='mb-5'
            required
            id='password'
            name='password'
            type='password'
            placeholder='········'
            onChange={handleChange}
            disabled={isLoading || !!data}
            wrapperStyle={{
              viewTransitionName: 'login-app-input-password',
              contain: 'layout'
            }}
          />

          <Input
            label='Repeat password'
            wrapperClass='mb-4'
            required
            id='repeat-password'
            name='repeat-password'
            type='password'
            placeholder='········'
            onChange={handleChange}
            disabled={isLoading || !!data}
          />

          {(!!error || !!validationError) &&
            <Alert
              variant='danger'
              description={error?.message ?? validationError}
            />
          }

          {!!data &&
            <Alert
              variant='success'
              description={data.message}
            />
          }

          <button
            className={classNames(
              'bg-blue-500 text-white w-full rounded-md h-[50px] hover:bg-blue-600',
              'disabled:bg-blue-300',
              'center relative',
              !error || !validationError ? 'mt-5' : ''
            )}
            disabled={isLoading || !!data}
            style={{
              viewTransitionName: 'login-app-loginbtn',
              contain: 'layout'
            }}
          >
            {isLoading
              ? <LoaderIcon width={24} height={24} className='animate-spin animation-6s' />
              : <span>Sign Up</span>
            }
          </button>

          {!isLoading &&
            <LinkButton
              to='/login'
              className='block text-center mt-4'
              style={{
                viewTransitionName: 'login-app-link',
                contain: 'layout'
              }}
            >
              <strong>Go back to login</strong>
            </LinkButton>
          }
        </form>
      </section>
    </main>
  )
}

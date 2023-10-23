import { type FormEvent, useState, useEffect } from 'react'
import classNames from 'classnames'

import logo from '@/assets/inventory.png'
import { Input, LinkButton } from '@/components/lib'
import { useAppNavigate, useAuthentication } from '@/hooks'
import { LoaderIcon } from '@/icons'
import Alert from '@/components/lib/Alert'
import { useHideHeader } from '@/features/header/HeaderContext'

export default function Login () {
  useHideHeader()
  const [userData, setUserData] = useState({ username: '', password: '' })
  const { isLoading, isAuthenticated, error, login } = useAuthentication()
  const { navigate } = useAppNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const handleChange = (e: FormEvent<HTMLInputElement>) => setUserData({
    ...userData,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return login(userData)
  }

  return (
    <main className='w-full h-full  flex flex-col'>
      <div
        className={classNames(
          'w-full h-[300px] relative rounded-b-[160px] bg-[#192543] flex justify-center',
          'bg-gradient-to-b from-[#192543] to-[#253561]'
        )}
      >
        <div
          style={{ viewTransitionName: 'login-app-logo', contain: 'layout' }}
          className={classNames(
            'w-[150px] h-[150px] absolute  bottom-[-60px] center',
            'bg-gradient-to-r from-[#e7eeff] to-[#c8d7ff]',
            'rounded-full shadow-xl shadow-[#0000000c]'
          )}
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
          <h2 className='text-4xl font-bold'>Welcome to Zoneve</h2>
          <h3 className='mb-4 mt-2'>Access credentials</h3>
        </div>

        <form onSubmit={handleSubmitLogin}>
          <Input
            label='Username'
            wrapperClass='mb-6'
            id='username'
            name='username'
            placeholder='Your username here...'
            autoComplete='off'
            onChange={handleChange}
            disabled={isLoading}
            wrapperStyle={{
              viewTransitionName: 'login-app-input-username',
              contain: 'layout'
            }}
          />

          <Input
            label='Password'
            wrapperClass='mb-6'
            id='password'
            name='password'
            type='password'
            placeholder='········'
            onChange={handleChange}
            disabled={isLoading}
            wrapperStyle={{
              viewTransitionName: 'login-app-input-password',
              contain: 'layout'
            }}
          />

          {!!error &&
            <Alert
              variant='danger'
              description={error.message}
            />
          }

          <button
            className={classNames(
              'bg-blue-500 text-white w-full rounded-md h-[50px] hover:bg-blue-600',
              'disabled:bg-blue-300',
              'center relative'
            )}
            disabled={isLoading}
            style={{
              viewTransitionName: 'login-app-loginbtn',
              contain: 'layout'
            }}
          >
            {isLoading
              ? <LoaderIcon width={24} height={24} className='animate-spin animation-6s' />
              : <span>Log in</span>
            }
          </button>

          {!isLoading &&
            <LinkButton
              to='/register'
              className='block text-center mt-4'
              style={{
                viewTransitionName: 'login-app-link',
                contain: 'layout'
              }}
            >
              Don&apos;t have an account? <strong>Sign Up!</strong>
            </LinkButton>
          }
        </form>
      </section>
    </main>
  )
}

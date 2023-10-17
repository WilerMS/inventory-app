import classNames from 'classnames'

import logo from '@/assets/inventory.png'
import { Link, Navigate } from 'react-router-dom'
import { Input } from '@/components/lib'
import { type FormEvent, useState } from 'react'
import useAuthentication from '@/hooks/useAuthentication'
import { LoaderIcon } from '@/icons'
import Alert from '@/components/lib/Alert'

export default function Login () {
  const [userData, setUserData] = useState({ username: '', password: '' })
  const { isLoading, isAuthenticated, error, login } = useAuthentication()

  const handleChange = (e: FormEvent<HTMLInputElement>) => setUserData({
    ...userData,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return login(userData)
  }

  if (isAuthenticated) return <Navigate to={'/'} replace />

  return (
    <main className='w-full h-full  flex flex-col'>
      <div
        className={classNames(
          'w-full h-[300px] relative rounded-b-[160px] bg-[#192543] flex justify-center',
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
            viewTransitionName: 'user-header-button',
            contain: 'layout'
          }}
        >
          <img className='w-1/2' src={logo} alt="Inventory app logo" />
        </div>
      </div>

      <section id='login' className='mt-[40px] p-8 rounded-lg'>

        <div className='text-center'>
          <h2 className='text-4xl font-bold'>&lt;Inventory&gt;</h2>
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
          >
            {isLoading
              ? <LoaderIcon width={24} height={24} className='animate-spin animation-6s' />
              : <span>Log in</span>
            }
          </button>

          {!isLoading &&
            <Link to='/register' className='block text-center mt-4'>
              Don&apos;t have an account? <strong>Sign Up!</strong>
            </Link>
          }
        </form>
      </section>
    </main>
  )
}

import cn from 'classnames'

import { LogoutIcon, UserIcon } from '@/icons'
import { useAppSelector } from '@/redux/hooks'
import { useAuthentication } from '@/hooks'

export default function Profile () {
  const user = useAppSelector(state => state.auth.user)
  const { logout } = useAuthentication()

  return (
    <>
      <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
        <div className='bg-gradient-to-b from-red-400 to-red-300 w-full h-[350px] absolute left-0 top-0 rounded-b-[100px]'>

        </div>
        <section className="mb-4">
          <div
            className={cn(
              'w-full h-[220px] center flex-col'
            )}
          >
            <div
              className='w-[200px] h-[200px] center overflow-hidden border-2 border-[#002f41] bg-gray-100 aspect-square center flex-col rounded-full'
              style={{
                viewTransitionName: 'user-header-button',
                contain: 'layout'
              }}
            >
              {user?.image
                ? <img src={`http://localhost:3000/images/${user.image}`} alt="" />
                : <UserIcon width={70} height={70} color='#002f41' />
              }
            </div>
          </div>
        </section>

      </main>
      <button
        className={cn(
          'absolute bottom-10 right-4 z-50',
          'w-[70px] h-[70px] rounded-full center bg-white shadow-lg border-4 border-red-500',
          'hover:scale-[1.02] transition-all'
        )}
        onClick={logout}
      >
        <LogoutIcon width={32} height={32} className='text-red-600 ml-1' />
      </button>
  </>
  )
}

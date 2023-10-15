import { AddIcon } from '@/icons'
import cn from 'classnames'

export const FloatingActionButton = () => {
  return (
    <button
      className={cn(
        'absolute bottom-10 right-4 z-50',
        'w-[70px] h-[70px] rounded-full center bg-white shadow-lg border-2 border-slate-300'
      )}
    >
      <AddIcon width={32} height={32}/>
    </button>
  )
}

import cn from 'classnames'

export default function NotFound () {
  return (
    <main className='w-full h-full pt-[75px] px-4 pb-[100px] overflow-auto scroll-bar-hide relative'>
      <section className="mb-4">
        <div
          className={cn(
            'w-full h-[250px] center flex-col'
          )}
        >
          NOT FOUND
        </div>
      </section>

    </main>
  )
}

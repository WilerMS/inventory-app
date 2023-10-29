import { AddIcon, MinusIcon } from '@/icons'
import cn from 'classnames'
import { type FormEvent, type CSSProperties, type FC, type InputHTMLAttributes } from 'react'

// @ts-expect-error
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  id: string
  bgcolor?: string
  textcolor: `#${string}`
  onChange: (value: number) => void
}

const Amount: FC<Props> = ({
  label,
  type,
  id,
  name,
  className,
  wrapperClass,
  placeholder,
  wrapperStyle,
  bgcolor = '#2a7964',
  textcolor = '#fff',
  disabled,
  value,
  onChange,
  ...props
}) => {
  const handleIncrease = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onChange(Number(value) + 1)
  }

  const handleDecrease = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onChange(Number(value) - 1)
  }

  return (
    <div className={cn('relative mb-4', wrapperClass)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <div
        id={id}
        className={cn(
          'w-full h-[55px] mt-1 border border-gray-300 rounded-md flex overflow-hidden'
        )}
      >
        <button
          disabled={disabled ?? Number(value) <= 0}
          onClick={handleDecrease}
          className={cn(
            'flex-1 center py-3 capitalize',
            'disabled:bg-gray-500'
          )}
          style={{
            background: bgcolor,
            color: textcolor
          }}
        >
          <MinusIcon width={22} height={22} color={textcolor} />
        </button>

        <input
          type="text"
          value={value}
          className='text-center outline-none'
          pattern="\d*"
          readOnly
        />

        <button
          disabled={disabled}
          onClick={handleIncrease}
          className={cn(
            'flex-1 center py-3 capitalize'
          )}
          style={{
            background: bgcolor,
            color: textcolor
          }}
        >
          <AddIcon width={22} height={22} color={textcolor} />
        </button>
      </div>
    </div>
  )
}

export default Amount

import cn from 'classnames'
import { type CSSProperties, type FC, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  id: string

}

const Input: FC<Props> = ({
  label,
  type,
  id,
  name,
  className,
  wrapperClass,
  placeholder,
  wrapperStyle,
  ...props
}) => {
  return (
    <div className={cn('relative', wrapperClass)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={cn(
          'mt-1 p-3 w-full rounded-md border border-gray-300 outline-none',
          'focus:ring focus:ring-blue-200 focus:border-blue-500',
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default Input

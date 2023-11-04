import cn from 'classnames'
import { type CSSProperties, type FC, type SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  id: string
  options: Array<{ value: string | number, label: string }>
}

const Select: FC<Props> = ({
  label,
  id,
  name,
  className,
  wrapperClass,
  wrapperStyle,
  options,
  ...props
}) => {
  return (
    <div className={cn('relative', wrapperClass)} style={wrapperStyle}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={cn(
          'mt-1 p-3 w-full rounded-md bg-white border border-gray-300 outline-none',
          'focus:ring focus:ring-blue-200 focus:border-blue-500',
          className
        )}
        {...props}
      >
        <option key={'Select'} value={0}>
          Select
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select

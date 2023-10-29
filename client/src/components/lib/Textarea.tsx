import cn from 'classnames'
import { type TextareaHTMLAttributes, type CSSProperties, type FC } from 'react'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  id: string

}

const Textarea: FC<Props> = ({
  label,
  id,
  name,
  className,
  wrapperClass,
  placeholder,
  wrapperStyle,
  value,
  onChange,
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
      <textarea
        id={id}
        name={name}
        className={cn(
          'mt-1 p-3 w-full rounded-md border border-gray-300 outline-none',
          'focus:ring focus:ring-blue-200 focus:border-blue-500',
          'min-h-[100px] max-h-[250px]',
          // 'invalid:ring-red-200 invalid:border-red-500 invalid:ring-2',
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

export default Textarea

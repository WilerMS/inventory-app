import cn from 'classnames'
import { type FC, useState, type FormEvent } from 'react'

interface Props {
  id?: string
  label: string
  color: string
  option1: string | boolean | number
  option2: string | boolean | number
  value: string | boolean | number | undefined
  className?: string
  disabled?: boolean
  onChange: (value: any) => void
}

const DualSwitch: FC<Props> = ({
  id,
  label,
  value,
  disabled = false,
  onChange,
  className,
  color = 'bg-rose-500',
  option1,
  option2
}) => {
  const [selected, setSelected] = useState(value)

  const handleClickFirstOption = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSelected(option1)
    onChange(option1)
  }

  const handleClickSecondOption = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSelected(option2)
    onChange(option2)
  }

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <div className="w-full mt-1 border border-gray-300 rounded-md flex overflow-hidden">
        <button
          disabled={disabled}
          onClick={handleClickFirstOption}
          className={cn(
            'flex-1 text-center py-3 capitalize',
            selected === option1 ? `${color} font-bold` : 'bg-white',
            selected === option1 ? 'text-white' : 'text-black'
          )}
        >
          {option1}
        </button>
        <button
          disabled={disabled}
          onClick={handleClickSecondOption}
          className={cn(
            'flex-1 text-center py-3 capitalize',
            selected === option2 ? `${color} font-bold` : 'bg-white',
            selected === option2 ? 'text-white' : 'text-black'
          )}
        >
          {option2}
        </button>
      </div>
    </div>
  )
}

export default DualSwitch

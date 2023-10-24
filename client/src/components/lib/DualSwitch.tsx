import cn from 'classnames'
import { type FC, useState, type FormEvent } from 'react'

interface Props {
  id?: string
  label: string
  bgcolor: string
  textcolor: string
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
  bgcolor = 'black',
  textcolor = 'white',
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
      <div id={id} className="w-full mt-1 border border-gray-300 rounded-md flex overflow-hidden">
        <button
          disabled={disabled}
          onClick={handleClickFirstOption}
          className={cn(
            'flex-1 text-center py-3 capitalize',
            selected === option1 ? 'font-bold' : 'bg-white'
          )}
          style={{
            background: selected === option1 ? bgcolor : 'white',
            color: selected === option1 ? textcolor : 'black'
          }}
        >
          {option1}
        </button>
        <button
          disabled={disabled}
          onClick={handleClickSecondOption}
          className={cn(
            'flex-1 text-center py-3 capitalize',
            selected === option2 ? 'font-bold' : ''
          )}
          style={{
            background: selected === option2 ? bgcolor : 'white',
            color: selected === option2 ? textcolor : 'black'
          }}
        >
          {option2}
        </button>
      </div>
    </div>
  )
}

export default DualSwitch

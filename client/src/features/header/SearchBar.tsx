import { SearchIcon } from '@/icons'
import classNames from 'classnames'
import { type FC, useRef, type FormEvent } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

const SearchBar: FC<Props> = ({
  value,
  onChange = (_) => {}
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleFocusSearchBar = () => ref.current?.focus()
  const handleChange = (e: FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value)

  return (
    <div
      className={classNames(
        'flex-grow h-full rounded-2xl border border-gray-300 flex items-center overflow-hidden px-2'
      )}
    >
      <input
        ref={ref}
        type="text"
        placeholder="Search something..."
        className="w-full h-full outline-none ml-3 bg-transparent"
        value={value}
        onChange={handleChange}
      />
      <button
        aria-label='Search'
        className="mr-1"
        onClick={handleFocusSearchBar}
      >
        <SearchIcon width={20} height={20} />
      </button>
    </div>
  )
}

export default SearchBar

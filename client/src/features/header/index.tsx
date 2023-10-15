import { BackIcon, SearchIcon, UserIcon } from "@/icons";
import cn from "classnames";
import { useRef } from "react";

export const Header = () => {

  const ref = useRef<HTMLInputElement>(null)

  const handleFocusSearchBar = () => ref.current?.focus()
  const handleClickBackButton = () => {
    console.log('Back')
  }

  return (
    <header className="bg-white h-[75px] p-4 flex items-center shadow">
      
      <button className="mr-2 p-2 rounded-full active:bg-gray-200 transition-all" onClick={handleClickBackButton}>
        <BackIcon width={24} height={24}/>
      </button>

      <div 
        className={cn(
          'flex-grow h-full rounded-2xl border border-gray-300 flex items-center overflow-hidden px-2'
        )}
      >
        <input
          ref={ref}
          type="text"
          placeholder="Buscar..."
          className="w-full h-full outline-none ml-3"
        />
        <button className="mr-1" onClick={handleFocusSearchBar}>
          <SearchIcon width={20} height={20} />
        </button>
      </div>
      <div className="ml-4 p-2 rounded-full bg-gray-100">
        <UserIcon />
      </div>
    </header>
  )
}
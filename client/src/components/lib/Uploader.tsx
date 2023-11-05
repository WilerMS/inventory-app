import { CameraIcon } from '@/icons'
import cn from 'classnames'
import React, { useRef } from 'react'

interface FileInputProps {
  onChange?: (file: File) => void
  className?: string
  acceptedExt?: string[]
}

const FileInput: React.FC<FileInputProps> = ({
  className,
  acceptedExt = [],
  onChange = () => {}
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const selectedFile = event.target.files ? event.target.files[0] : null
    if (!selectedFile) return
    if (acceptedExt.includes(selectedFile?.type)) {
      onChange(selectedFile)
    }
  }

  return (
    <div className={cn(
      'cursor-pointer',
      className
    )}>
      <input
        type="file"
        className="absolute opacity-0 -z-40"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        aria-label={'Upload file'}
        className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center"
        onClick={() => fileInputRef.current?.click()}
      >
        <CameraIcon width={32} height={32}/>
      </button>
    </div>
  )
}

export default FileInput

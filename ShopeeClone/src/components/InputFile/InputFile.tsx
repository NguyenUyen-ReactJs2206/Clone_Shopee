import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  //   const [file, setFile] = useState<File>()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error(`Dung lượng file tối đa là 1 MB. Định dạng .JPEG, .PNG`, {
        position: 'top-center'
      })
    } else {
      //   setFile(fileFromLocal)
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        accept='.jpg, .jpeg, .png'
        className='hidden'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          ;(event.target as any).value = null
        }}
      />
      <button
        type='button'
        onClick={handleUpload}
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </>
  )
}

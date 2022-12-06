import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useState } from 'react'

const ImageInput = forwardRef(({ onChange, initalPhoto, ...props }, ref) => {
  const [fileDataUrl, setfileDataUrl] = useState(false)
  const fileInputRef = useRef()

  const handleFileChange = (_e) => {
    const file = _e.target.files?.[0]

    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result) {
          setfileDataUrl(result)
        }
      }
      fileReader.readAsDataURL(file)
    } else {
      setfileDataUrl(false)
    }

    onChange(_e)
  }

  useImperativeHandle(ref, () => ({
    clear: () => {
      setfileDataUrl(false)
    },
  }))

  return (
    <>
      <img
        src={fileDataUrl || initalPhoto}
        className="w-full aspect-square object-cover rounded-xl cursor-pointer "
        onClick={() => fileInputRef.current.click()}
      />

      <input
        ref={fileInputRef}
        hidden
        type="file"
        onChange={handleFileChange}
        {...props}
      />
    </>
  )
})

ImageInput.displayName = 'ImageInput'

export default ImageInput

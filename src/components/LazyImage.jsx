import { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'

export default function LazyImage({ src, ...props }) {
  const [imgSrc, setImgSrc] = useState(false)

  useEffect(() => {
    const imageElement = new Image()
    imageElement.onload = () => {
      setImgSrc(src)
    }
    imageElement.src = src
  }, [src])

  if (imgSrc)
    return (
      <img
        src={imgSrc}
        {...props}
      />
    )
  return (
    <ContentLoader
      speed={2}
      {...props}
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
      ></rect>
    </ContentLoader>
  )
}

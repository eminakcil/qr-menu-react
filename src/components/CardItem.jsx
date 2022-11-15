import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'

export default function CardItem({ to, src, text, ...props }) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const rootElement = useRef()
  const imageElement = useRef()

  useEffect(() => {
    if (isVisible && !imageLoading && !imageLoaded && imageElement) {
      setImageLoading(true)

      imageElement.current.onload = () => setImageLoaded(true)

      imageElement.current.onerror = () => setImageError(true)

      imageElement.current.src = src
    }
  }, [isVisible, imageElement])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
    })
    if (rootElement.current) observer.observe(rootElement.current)

    return () => {
      if (rootElement.current) observer.observe(rootElement.current)
    }
  }, [rootElement])

  return (
    <Link
      to={to}
      className="shadow-item rounded-3xl bg-white text-black hover:bg-green-200 hover:text-green-900 transition-colors flex justify-center items-center text-center overflow-hidden"
      style={{ '--aspect-ratio': '1' }}
      ref={rootElement}
      {...props}
    >
      <div>
        <div
          className={classNames({
            'relative h-full w-full': true,
            hidden: !imageLoaded,
          })}
        >
          <img
            ref={imageElement}
            alt={text}
          />
          <span
            className="absolute bottom-3 left-3 text-white text-left font-medium"
            style={{
              textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
            }}
          >
            {text}
          </span>
        </div>
        {imageLoading && !imageLoaded && !imageError && (
          <ContentLoader
            speed={2}
            style={{ width: '100%', height: '100%' }}
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
            ></rect>
          </ContentLoader>
        )}
        {imageError && <div className="h-full flex justify-center items-center">Hata!</div>}
      </div>
      {/* <div>
        <div
          className={classNames({
            hidden: imageLoading,
          })}
        >
          <img
            className="absolute top-0 left-0 w-full h-full object-fill"
            src={src}
            onLoad={(e) => {
              console.log(e)
              setImageLoading(false)
              // console.log('burda bişey var')
            }}
            loading="lazy"
          />
          <span
            className="absolute bottom-3 left-3 text-white text-left font-medium"
            style={{
              textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
            }}
          >
            {text}
          </span>
        </div>
        {imageLoading && (
          <>
            <ContentLoader speed={2} style={{ width: '100%', height: '100%' }}>
              <rect x="0" y="0" width="100%" height="100%"></rect>
            </ContentLoader>
          </>
        )}
      </div> */}
    </Link>
  )
}

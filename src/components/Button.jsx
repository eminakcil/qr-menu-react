import classNames from 'classnames'
import { createElement } from 'react'

const Button = ({
  as = 'button',
  variant = 'blue',
  circle = false,
  className,
  children,
  ...props
}) =>
  createElement(
    as,
    {
      className: classNames(
        'text-center',
        { 'px-3 py-2 rounded': !circle, 'p-3 rounded-full': circle },
        { 'bg-blue-500 text-gray-200 hover:bg-blue-700 hover:text-white': variant === 'blue' },
        { 'bg-red-500 text-gray-200 hover:bg-red-700 hover:text-white': variant === 'red' },
        { 'text-red-500 hover:bg-red-100 hover:text-red': variant === 'red-0' },
        {
          'bg-gray-400 hover:bg-gray-200 text-gray-700 hover:text-gray-800 active:bg-gray-400':
            variant === 'dark',
        },
        { 'text-gray-700 hover:bg-gray-300 hover:text-gray-900': variant === 'dark-0' },
        { 'bg-green-400 text-green-700 hover:bg-green-600 hover:text-white': variant === 'green' },
        { 'bg-gray-400 text-gray-800 hover:bg-gray-600 hover:text-white': variant === 'gray' },
        className
      ),
      ...props,
    },
    children
  )

export default Button

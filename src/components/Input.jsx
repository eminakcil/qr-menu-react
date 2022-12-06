import { createElement, forwardRef } from 'react'
import FormText from './FormText'

const Input = forwardRef(({ label, inline = false, type = 'text', ...props }, ref) => {
  const inputElements = {
    textarea: 'textarea',
  }

  return (
    <div>
      {!inline && (
        <label className="block mb-2">
          <FormText>{label}</FormText>
        </label>
      )}
      {createElement(inputElements?.[type] || 'input', {
        ref,
        type,
        className:
          'block w-full p-2.5 text-sm rounded-lg bg-gray-200 border border-gray-400 text-gray-700 placeholder-gray-500',
        ...props,
      })}
    </div>
  )
})

Input.displayName = 'Input'

export default Input

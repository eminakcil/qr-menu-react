import { forwardRef } from 'react'
import FormText from './FormText'

const Input = forwardRef(({ label, inline = false, type = 'text', ...props }, ref) => {
  return (
    <div>
      {!inline && (
        <label className="block mb-2">
          <FormText>{label}</FormText>
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className="block w-full p-2.5 text-sm rounded-lg bg-gray-200 border border-gray-400 text-gray-700 placeholder-gray-500"
        placeholder={label}
        {...props}
      />
    </div>
  )
})

Input.displayName = 'Input'

export default Input

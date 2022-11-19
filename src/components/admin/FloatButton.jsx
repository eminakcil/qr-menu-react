import { GoPlus } from 'react-icons/go'

const FloatButton = () => {
  return (
    <div className="fixed bottom-20 right-20">
      <button className="rounded-full h-12 w-12 bg-gray-400 hover:bg-gray-200 text-gray-700 hover:text-gray-800 active:bg-gray-400 grid place-items-center">
        <GoPlus className="w-6 h-6" />
      </button>
    </div>
  )
}
export default FloatButton

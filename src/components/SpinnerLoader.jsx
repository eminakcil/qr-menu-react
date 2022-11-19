import Loading from './Loading'

const SpinnerLoader = () => {
  return (
    <div className="w-full h-full flex-1 grid place-items-center bg-gray-700 rounded-2xl py-5">
      <Loading />
    </div>
  )
}
export default SpinnerLoader

import { Toaster } from 'react-hot-toast'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

const App = () => {
  return (
    <>
      {useRoutes(routes)}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </>
  )
}
export default App

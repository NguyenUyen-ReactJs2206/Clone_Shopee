import useRouterElements from './useRouterElements'
import { ToastContainer } from 'react-toastify'

function App() {
  const routeElements = useRouterElements()
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App

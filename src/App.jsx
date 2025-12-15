import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter ,RouterProvider , Outlet } from 'react-router-dom'
import Header from './Comman/Header.jsx'
import Footer from './Comman/Footer.jsx'
import Home from './Page/Home.jsx'
import ProductView from './Page/ProductView.jsx'

const Layout = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}
function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index : true,
          element: <Home />
        },
        {
          path:"/product/:id",
          element: <ProductView />
        }
      ]
    }
  ])



  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App

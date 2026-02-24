import '../index.css'
import App from '../App.jsx' 
import { createBrowserRouter , Navigate, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import CreateNews from '../pages/CreateNews.jsx'
import DetailNews from '../pages/DetailNews.jsx'
import SignIn from '../pages/SignIn.jsx'
import SignUp from '../pages/SignUp.jsx'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'

const Routes = () => {

  let { user } = useContext(UserContext)

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children: [
        {
    path : '/',
    element : user ? <Home/> : <Navigate to={'/signIn'} />
  },
  {
    path : '/createNews',
    element :  user ? <CreateNews/> : <Navigate to={'/signIn'} />
  },
   {
    path : '/updateNews/:id',
    element : <CreateNews/>
  },
   {
    path : '/detailNews/:id',
    element : <DetailNews/>
  },
  {
    path : '/signIn',
    element : !user ? <SignIn/> : <Navigate to={'/'} />
  },
  {
    path : '/signUp',
    element : !user ? <SignUp/> : <Navigate to={'/'} />
  },
    ]
  },
])

  return (
    
      <RouterProvider router = {router} />
    
  )
}

export default Routes

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import Routes from './routing/Routes.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  </StrictMode>,
)

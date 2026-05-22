import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppDataProvider } from './Controllers/DataController/projectCardData.jsx'
import { UserLoginData } from './Controllers/authController.jsx'
import { CategoryDataProvider } from './Controllers/DataController/add_Category.jsx'
import { CartProvider } from './Controllers/DataController/cartContext.jsx'
// import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AppDataProvider>
        <UserLoginData>
          <CategoryDataProvider>
            <CartProvider>

            <App />
            
            </CartProvider>
          </CategoryDataProvider>
        </UserLoginData>

        {/* </UserLoginData> */}
      </AppDataProvider>
    </BrowserRouter>
  </StrictMode>,
)

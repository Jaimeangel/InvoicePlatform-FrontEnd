import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
//react router
import {RouterProvider} from 'react-router-dom'
//rutas
import router from './routes'
//contexts
import AuthProvider from './context/AuthProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider
      router={router}
    />
  </AuthProvider>
)

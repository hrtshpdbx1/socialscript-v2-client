// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// •	createBrowserRouter : construit le router à partir du tableau de routes
// •	RouterProvider : le rend disponible dans toute l'app

import { routes } from './routes.jsx'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
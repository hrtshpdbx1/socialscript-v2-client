// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//! State management "Jotai"
import { Provider } from 'jotai'
import { store } from './atoms/store.js'

//! Routing
import { routes } from './routes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// •	createBrowserRouter : construit le router à partir du tableau de routes
// •	RouterProvider : le rend disponible dans toute l'app

const router = createBrowserRouter(routes)

//! Rendu de l'app React dans ta page
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
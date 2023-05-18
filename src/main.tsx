import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import Home from './pages/Home';
import About from './pages/About';
import Explore from './pages/Explore';
import Contact from './pages/Contact';
import { SignUp, SignIn } from './pages/LoginSignUp';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

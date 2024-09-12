import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='960970950749-33oqcfb69o726udoidej0ebb6kiprgcp.apps.googleusercontent.com'>
    <ToastContainer position='top-center' autoClose={1000} theme='dark'/>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>,
)

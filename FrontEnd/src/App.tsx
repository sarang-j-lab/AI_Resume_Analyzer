import { lazy, Suspense, type ReactElement } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import ProtectedRoute from './FeatureComponents/ProtectedRoute.tsx';
axios.defaults.withCredentials = true;

const SignIn = lazy(() => import('./Pages/SignIn'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const Upload = lazy(() => import('./Pages/Upload'));
const Feedback = lazy(() => import('./Pages/Feedback'));
const Home = lazy(() => import('./Pages/Home'));

function App(): ReactElement {

  return (
    <>
      <Suspense fallback={<h1 className='flex justify-center items-center h-screen'>Loading...</h1>}>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/feedback' element={<Feedback />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App

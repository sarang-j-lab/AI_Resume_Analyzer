import type { ReactElement } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import SignIn from './Pages/SignIn.tsx'
import SignUp from './Pages/SignUp.tsx'
import ProtectedRoute from './FeatureComponents/ProtectedRoute.tsx'
import axios from 'axios'
import Upload from './Pages/Upload.tsx'
axios.defaults.withCredentials = true;


function App(): ReactElement {

  return (
    <>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/upload' element={<Upload />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

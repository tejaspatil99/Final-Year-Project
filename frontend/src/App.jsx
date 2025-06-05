import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Disease from './components/Disease'  // ✅ Add this line
import Result from './components/Result'

import HeartForm from './components/HeartForm'
import DiabetesForm from './components/DiabetesForm'
import LiverForm from './components/LiverForm'
import BreastCancerForm from './components/BreastCancerForm'
import ParkinsonsForm from './components/ParkinsonsForm'


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/disease' element={<Disease />} />
        <Route path='/predict-diabetes' element={<DiabetesForm />} />
        <Route path='/predict-heart' element={<HeartForm />} />
        <Route path='/predict-liver' element={<LiverForm />} />
        <Route path='/predict-parkinsons' element={<ParkinsonsForm />} />
        <Route path='/predict-breast-cancer' element={<BreastCancerForm />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
import React from 'react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/footer/Footer'
import AllProducts from './components/AllProducts'

export default function () {
  return (
    <div>
    <Navbar/>
   <AllProducts/>
    <Footer/>
    </div>
  )
}

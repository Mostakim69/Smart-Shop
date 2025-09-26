import React from 'react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/footer/Footer'
import AllProducts from './components/AllProducts'
import axios from 'axios'

export default function () {

  const products = fetch('https://smart-shop-server-three.vercel.app/products')
    .then(res => res.json());


  return (
    <div>
      <Navbar />
      <AllProducts products={products}/>
      <Footer />
    </div>
  )
}

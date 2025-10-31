"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/footer/Footer'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get(`https://smart-shop-server-three.vercel.app/cartItems?email=${user?.email}`)
      .then(res => setCartItems(res.data))
      .catch(err => console.log(err));
  }, [user?.email]);

  const handleDeleteToCart = async (id) => {
    axios.delete(`https://smart-shop-server-three.vercel.app/cartItems/${id}`)
      .then(res => {
        if (res.data?.deletedCount) {
          const remaining = cartItems.filter(item => item._id !== id);
          setCartItems(remaining);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="">
      <Navbar />

      <div className='py-10 max-w-7xl mx-auto px-4 min-h-[70vh]'>
        <h2 className='text-3xl font-semibold text-center mt-10 mb-5 text-primary'>Shopping Cart {cartItems?.length}</h2>

        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-4'>
          {/* Cart Items */}
          <div className='flex-1'>
            {cartItems?.length > 0 ? (
              cartItems.map(item => (
                <div key={item._id} className='flex items-center gap-4 bg-base-100 p-4 rounded-lg shadow mb-4'>
                  <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className='w-24 h-24 object-cover rounded' />

                  <div className='flex-1'>
                    <h3 className='font-medium text-base-content'>{item.name}</h3>
                    <div className='flex items-center gap-2 mt-2'>
                      <span className='text-primary font-bold text-lg'>৳ {item.price}</span>
                      {item.originalPrice && (
                        <span className='line-through text-neutral-focus text-sm'>৳ {item.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button className='btn btn-sm btn-outline'>-</button>
                    <span>{item.quantity}</span>
                    <button className='btn btn-sm btn-outline'>+</button>
                  </div>

                  <div className='flex flex-col items-center gap-2'>
                    <button onClick={() => handleDeleteToCart(item?._id)} className='text-error cursor-pointer hover:text-error-focus text-xl'>🗑️</button>
                    <button className='text-neutral hover:text-primary text-xl'>❤️</button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-neutral mt-10'>No items in cart</p>
            )}
          </div>

          {/* Summary */}
          <div className='w-full lg:w-1/3 bg-base-100 p-6 rounded-lg shadow h-fit'>
            <h3 className='text-xl font-semibold mb-4 text-base-content'>Order Summary</h3>
            <div className='flex justify-between mb-2 text-base-content'>
              <span>Subtotal ({cartItems.length} items)</span>
              <span>৳ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
            </div>
            <div className='flex justify-between mb-2 text-base-content'>
              <span>Shipping Fee</span>
              <span>৳ 0</span>
            </div>
            <hr className='my-3' />
            <div className='flex justify-between font-bold text-lg mb-4 text-base-content'>
              <span>Total</span>
              <span>৳ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Enter Voucher Code'
                className='flex-1 input input-bordered'
              />
              <button className='btn btn-primary'>APPLY</button>
            </div>
            <button onClick={() => router.push(`/checkout?type=cart&email=${user?.email}`)} className='w-full mt-4 btn btn-warning font-semibold'>
              PROCEED TO CHECKOUT ({cartItems.length})
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

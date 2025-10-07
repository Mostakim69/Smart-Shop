import Footer from '@/app/components/shared/footer/Footer'
import Navbar from '@/app/components/shared/Navbar'
import React from 'react'
import ProductCard from '../components/ProductCard';

export default async function productDetailsPage({ params }) {

    const { id } =await params;

    const product = await fetch(`http://smart-shop-server-three.vercel.app/products/${id}`)
        .then(res => res.json())
        .catch(err => {
            console.log(err);

        })
    console.log(product);


    return (
        <div>
            <Navbar></Navbar>
            <main className='min-h-[70vh]'>
                <ProductCard product={product}></ProductCard>
            </main>

            <Footer></Footer>
        </div>
    )
}

import Footer from '@/app/components/shared/footer/Footer'
import Navbar from '@/app/components/shared/Navbar'
import React from 'react'
import ProductCard from '../components/ProductCard';

export default async function productDetailsPage({ params }) {

    const { id } = await params;

    const product = await fetch(`https://smart-shop-server-three.vercel.app/products/${id}`)
        .then(res => res.json())
        .catch(err => {
            console.log(err);

        })
    console.log(product);

    const allProducts = await fetch(`https://smart-shop-server-three.vercel.app/products`)
        .then(res => res.json())
        .catch(err => {
            console.log(err);

        })

    const related = allProducts
        .filter(
            (item) =>
                item.category?.toLowerCase() === product?.category?.toLowerCase() &&
                item._id !== product?._id
        ).slice(0,4);


    return (
        <div>
            <Navbar></Navbar>
            <main className='min-h-[70vh]'>
                <ProductCard product={product} related={related} allProducts={allProducts}></ProductCard>
            </main>

            <Footer></Footer>
        </div>
    )
}


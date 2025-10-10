import axiosInstance from '@/lib/axiosInstance';
import React, { useEffect, useState } from 'react'
import Rating from '../rating/Rating';
import Review from '../riview/Review';

export default function RatingAndReview({ product }) {

    const [reviews, setReviews] = useState([]);



    return (
        <div className='bg-base-100 p-4'>
            <h1 className='text-2xl font-semibold'>Ratings & Reviews of {product?.name}</h1>
            <Rating></Rating>
            <hr />
            <Review></Review>
        </div>

    )
}

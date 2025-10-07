import Link from 'next/link'
import React from 'react'
import GoBackButton from './components/goBackButton/page'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <img 
        src="https://i.ibb.co.com/JR9vCCMv/404.jpg" 
        alt="404 Not Found" 
        className="w-full max-w-md mb-8 drop-shadow-lg"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
            <div className="flex gap-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Back to Home
        </Link>
        <GoBackButton label="Back to Previous Page" />
      </div>
    </section>
  )
}

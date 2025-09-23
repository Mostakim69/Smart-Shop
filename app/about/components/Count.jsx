import React from 'react';

export default function Count() {
  return (
    <div className="flex justify-around items-center py-10 bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900">50K+</p>
        <p className="text-sm text-gray-600">Happy Customers</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.5 9a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z" clipRule="evenodd"/>
            </svg>
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900">100+</p>
        <p className="text-sm text-gray-600">Countries Served</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900">5 Years</p>
        <p className="text-sm text-gray-600">Industry Experience</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900">99%</p>
        <p className="text-sm text-gray-600">Customer Satisfaction</p>
      </div>
    </div>
  );
}
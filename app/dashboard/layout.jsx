import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import DashboardNavbar from '../components/dashNav/DashNav'

export default function DashboardLayout({ children }) {
  return (
    <div className='bg-gray-50'>
      <div className="flex">
        <Sidebar />
        <div className='grid w-full'>
          <DashboardNavbar></DashboardNavbar>
          <div className="flex-1 p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import DashboardNavbar from '../components/dashNav/DashNav'

export default function DashboardLayout({ children }) {
  return (
      <main className="flex">
        <div className='hidden md:block'><Sidebar /></div>
        <div className='flex-1 flex flex-col'>
          <DashboardNavbar></DashboardNavbar>
          <section className="flex-1">
            {children}
          </section>
        </div>
      </main>
  )
}

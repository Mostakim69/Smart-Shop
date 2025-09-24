import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'

export default function DashboardLayout({children}) {
  return (
     <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  )
}

import React from 'react'
import OrgAllTasks from '../Components/OrgAllTasks'

export default function OrgTasks() {
  return (
    <div>
      <div className="bg-slate-800 mb-5">
        <div className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative">
          
            <div className="p-20 sm:p-14 md:p-14 lg:p-24 xl:p-20 w-auto px-2 sm:px-4 md:px-14 lg:px-24 xl:px-24 relative text-gray-300">
            <p className="text-6xl py-4 flex justify-center">Tasks</p>
              {/* <button onClick={handleCreateTask} className=' flex bg-gray-400 text-white justify-center'>create task</button> */}
              <OrgAllTasks />

              {/* <h1>editor dashboard is here</h1> */}

              {/* <button onClick={handleLogoutEditor}>logout </button> */}
            </div>
          
        </div>
      </div>
    </div>
  )
}

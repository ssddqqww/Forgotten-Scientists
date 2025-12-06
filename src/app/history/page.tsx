import React from 'react'
import Banner from './components/Banner'
import MainSection from './components/MainSection'
import Timeline from './components/Timeline'

function page() {
  return (
    <div>
        <Banner />
        <div className='h-full w-full bg-[#D6EAFF] max-w-7xl mx-auto px-10 md:px-2 lg:px-20 py-10'>
             <Timeline />
             <MainSection />
        </div>
    </div>
  )
}

export default page
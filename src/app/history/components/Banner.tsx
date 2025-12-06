import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <div>
        <Image src="/Group 11.png" className='w-full' alt="Banner Image" width={500} height={300} />
    </div>
  )
}

export default Banner
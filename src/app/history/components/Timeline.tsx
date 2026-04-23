import Image from 'next/image'
import React from 'react'

function Timeline() {
  return (
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <button className="flex items-center gap-2 pr-4 py-2 border-r">
                        <Image src="/icons/Waterfall.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                        Completed Quizzes
                    </button>

                    <button className="flex items-center gap-2 pr-4 py-2 border-r">
                        <Image src="/icons/Flask_light.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                        Recent Scientist Views
                    </button>

                    <button className="flex items-center gap-2 pr-4 py-2">
                        <Image src="/icons/globe.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                        Viewed News
                    </button>
                </div>
  )
}

export default Timeline

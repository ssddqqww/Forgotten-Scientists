import React from 'react'

function Timeline() {
  return (
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <button className="flex items-center gap-2 pr-4 py-2 border-r">
                        <img
                            src="/icons/Waterfall.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        Completed Quizzes
                    </button>

                    <button className="flex items-center gap-2 pr-4 py-2 border-r">
                        <img
                            src="/icons/Flask_light.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        Recent Scientist Views
                    </button>

                    <button className="flex items-center gap-2 pr-4 py-2">
                        <img
                            src="/icons/globe.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        Viewed News
                    </button>
                </div>
  )
}

export default Timeline
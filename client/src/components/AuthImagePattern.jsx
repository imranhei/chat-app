import React from 'react'

const AuthImagePattern = ({ title, subtitme }) => {
  return (
    <div className='hidden lg:flex items-center justify-center bg-gray-200 p-12'>
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`w-24 h-24 rounded-2xl bg-primary/10 ${index % 2 ? "animate-pulse" : ""}`}
            ></div>
          ))}
        </div>
        <h2 className='text-2xl font-bold mb-4'>{title}</h2>
        <p className="">{subtitme}</p>
      </div>
    </div>
  )
}

export default AuthImagePattern

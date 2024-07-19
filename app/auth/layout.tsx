import React from 'react'

function AuthLayout({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-400 to-blue-400'>
        {/* <nav className='bg-black text-white'>
            shared navbar for the Auth
        </nav> */}
        {children}</div>
  )
}

export default AuthLayout
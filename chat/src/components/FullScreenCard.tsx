import React from "react";

type Props = {
  children: React.ReactNode
}

export function FullScreenCard({children}: Props) {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='max-w-md w-full'>
        {children}
      </div>
    </div>
  )
}

FullScreenCard.Body = function({children}: Props) {
  return <div className='shadows bg-white p-6 rounded-lg'>{children}</div>
}
FullScreenCard.BelowCard = function({children}: Props) {
  return <div className='mt-2 justify-center flex gap-3'>{children}</div>
}
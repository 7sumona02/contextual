import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full fixed bottom-0 py-3 md:px-0 px-4'>
        <div className='max-w-4xl mx-auto flex justify-between items-center text-xs text-neutral-600'>
            <div>©2024 contextual – all rights reserved.</div>
            <div className="text-base font-bold flex gap-1 items-center">
              <Link href='https://twitter.com/weebdev_san'><div className="size-8 border border-neutral-200 p-2 rounded flex justify-center items-center cursor-pointer">𝕏</div></Link>
              <Link href={'mailto:sumonadotwork@gmail.com'}><div className="size-8 border border-neutral-200 p-2 rounded flex justify-center items-center cursor-pointer">✉️</div></Link>
            </div>
        </div>
    </div>
  )
}

export default Footer
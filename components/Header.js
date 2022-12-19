import React from 'react'
import Link from 'next/link'
// import Image from 'next/image'

const Header = () => {
    return (
        <header className='bg-gray-900 text-gray-100 shadow w-full'>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link className='flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4' href={'/'}>
                    <img src={'/images/logo.png'} width={40} height={40} alt={'logo'} />
                    <span className='ml-3 text-xl'>DevSpace</span>
                </Link>
                <nav className='flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto'>
                    <Link className='mx-5 cursor-pointer uppercase hover:text-indigo-300' href={'/blog'}>
                        Blog
                    </Link>
                    <Link  href={'/about'}>
                        About
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
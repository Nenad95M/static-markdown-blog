import React from 'react'
import Head from 'next/head'
import Header from './Header'
export const Layout = ({ title, keywords, description, children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel='icon' href='/favicon.ico' />
                <link name="description" content={description} />
                <link name="keywords" content={keywords} />

            </Head>
            <Header/>
            <main className='container mx-auto my-7'>
                {children}
            </main>
        </div>
    )
}
Layout.defaultProps = {
    title: "Welcome to DevSpace",
    keywords: "development, coding"
}
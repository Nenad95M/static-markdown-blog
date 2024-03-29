import React from 'react'
import { Layout } from '@/components/Layout'
export default function About() {
  return (
    <Layout title={'About DevSpace'}>
        <h1 className="text-5xl border-b-4 pb-5 font-bold">
            About
        </h1>
        <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
            <h3 className="text-2xl mb-5">DevSpace Blog</h3>
            <p className="mb-3">
                Blog napravljen uz pomoc Next.js tehnologije
            </p>
            <p>
                <span className="font-bold">v1.0</span>
            </p>
        </div>
    </Layout>
  )
}

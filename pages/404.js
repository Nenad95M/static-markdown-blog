import Link from "next/link"
// import Image from "next/image"
import { Layout } from "@/components/Layout"
export default function NotFound() {
  return (
    <Layout title={'Page not found'}>
    <div className="flex flex-col items-center mt-20">
        <img className="bg-gray" src={'/images/logo.png'} width={70} height={70}/>
    </div>
    <h1 className="text-6xl my-5">
        Whoops!
    </h1>
    <h2 className="text-4xl text-gray-400 mb-5">
        Page not found
    </h2>
    </Layout>
  )
}

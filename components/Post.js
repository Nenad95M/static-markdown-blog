import Link from "next/link"
import Image from "next/image"

const Post = ({ post }) => {
    return (
        <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
           <Image src={post.frontmatter.cover_image} alt='' height={420} width={600} className='mb-4 rounded'/>
             <div className="flex justify-between items-center">
                <span className="font-light text-gray-600">
                    {post.frontmatter.date}
                </span>
                <div>
                    {post.frontmatter.category}
                </div>
             </div>
             <div className="mt-2">
                    <Link href={`/blog/${post.slug}`}>
                       {post.frontmatter.title}
                    </Link>
                    <p className="flex justify-between items-center mt-6">{post.frontmatter.excerpt}</p>
              <Link className="text-blue-900 hover:text-blue-600" href={`blog/${post.slug}`}>
                Read more
              </Link>
                </div>
        <div className="flex items-center mt-2">
            <img src={post.frontmatter.author_image} alt="Author image" className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" />
       <h3 className="text-gray-700 font-bold">{post.frontmatter.author}</h3>
        </div>
             </div>
    )
}

export default Post
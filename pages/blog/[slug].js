import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { marked } from 'marked';

import { Layout } from '@/components/Layout';
import CategoryLabel from '@/components/CategoryLabel';
export default function PostPage({ frontmatter, content, slug }) {
    const { title, category, date, cover_image, author, author_image } = frontmatter;
    console.log(author)
    return (
        <Layout title={title}>
            <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
                <h1 className="text-5xl mb-7">{title}</h1>
                <CategoryLabel>
                    {category}
                </CategoryLabel>
                <img src={cover_image} alt={title} className='w-full rounded' />
                <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
                    <div className='flex items-center'>
                        <img src={author_image} alt="" className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block' />
                        <h4>{author}</h4>
                    </div>
                    <div className="mr-4">
                        {date}
                    </div>
              
                </div>
                <div className="blog-text mt-2">
                         <div dangerouslySetInnerHTML={{__html: marked(content)}}>

                         </div>
                    </div>
            </div>
        </Layout>
    )
}
export async function getStaticPaths() {
    const files = fs.readdirSync(path.resolve('posts'));
    const paths = files.map(filename => {
        return {
            params: {
                slug: filename.replace('.md', '')
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params: { slug } }) {
    try {
        const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')


        const { data: frontmatter, content } = matter(markdownWithMeta);
        return {
            props: {
                frontmatter,
                content,
                slug
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}
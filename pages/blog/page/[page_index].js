//importujemo node module, mozemo samo da ih koristimo unutar getStaticProps koji ide na serveru
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import Link from 'next/link';
import { sortByDate } from '@/utils/index';
import { Layout } from "@/components/Layout"
import Post from '@/components/Post';
import { POSTS_PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';

export default function BlogPage({ posts, numPages, currentPage }) {
    return (
        <Layout>
            <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                )
                )}
            </div>
            <Link className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5
      transition duration-500 ease select-none hover:text-white
      hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full' href={'/'}>Back to home page</Link>
            <Pagination currentPage={currentPage} numPages={numPages}/>
        </Layout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'));
    //stranice dobijamo tako sto podelimo postove sa njihovim prikazom po strani
    const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

    let paths = [];
    for (let i = 1; i <= numPages; i++) {
        paths.push({
            //pravimo paginaciju na osnovu broja stranica
            params: { page_index: i.toString() }
        })
    }
    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({ params }) {
    const page = parseInt((params && params.page_index) || 1)
    //ucitavamo direktorijum i pravimo niz od naziva njegovih fajlova
    const files = fs.readdirSync(path.join('posts'));
    //mapiramo niz naziva ovih fajlova
    const posts = files.map(filename => {
        //za svaki slug uzimamo naziv mapiranog fajla bez ekstenzije .md
        const slug = filename.replace('.md', '');
        //ucitavamo svaki fajl
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
        //pozivamo matter funkciju iz gray-matter biblioteke
        const { data: frontmatter } = matter(markdownWithMeta);
        //fracamo slug i frontmatter sto je ucitani naziv fajla
        return {
            slug,
            frontmatter
        }
    })
    const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
    const pageIndex = page - 1;
    const orderedPosts = posts.sort(sortByDate).slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);
    //mapirani niz posts gde koristimo module, vracamo kao staticki props
    //
    return {
        props: {
            posts: orderedPosts,
            numPages,
            currentPage: page
        },
    }
}
//importujemo node module, mozemo samo da ih koristimo unutar getStaticProps koji ide na serveru
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import Link from 'next/link';
import { sortByDate } from '@/utils/index';
import { Layout } from "@/components/Layout"
import Post from '@/components/Post';
export default function CategoryBlogPage({ posts }) {
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        )
        )}
      </div>
      <Link className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5
      transition duration-500 ease select-none hover:text-white
      hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full' href={'/blog'}>More posts</Link>
    </Layout>
  )
}

export async function getStaticPaths(){
    const files=fs.readdirSync(path.join('posts'));
    const categories=files.map(filename=>{
        const markdownWithMeta=fs.readFileSync(path.join('posts', filename), 'utf-8');
        const {data:frontmatter}=matter(markdownWithMeta);

        return frontmatter.category.toLowerCase();
    })
    //mapiramo svaku kategoriju kao vrednost kljuca category_name
const paths=categories.map(category=>({
    params:{category_name:category}
}))
    return{
        paths,
        fallback:false,
    }
}

export async function getStaticProps({params:{category_name}}) {
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
  //mapirani niz posts gde koristimo module, vracamo kao staticki props
  //

  //filtriramo postove po kategoriji
  const categoryPosts=posts.filter(post=>post.frontmatter.category.toLowerCase()===category_name
)
  return {
    props: {
      posts:categoryPosts.sort(sortByDate),
      category_name:category_name
    },
  }
}
//importujemo node module, mozemo samo da ih koristimo unutar getStaticProps koji ide na serveru
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import Link from 'next/link';
import { sortByDate } from '@/utils/index';
import { Layout } from "@/components/Layout"
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import { getPosts } from '@/lib/posts';
export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
       <div className="flex justify-between">
                <div className="w-3/4 mr-10">
                <h1 className='text-5xl border-b-4 p-5 font-bold'>Latest Posts in {categoryName}</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {posts.map((post, index) => (
                            <Post key={index} post={post} />
                        )
                        )}
                    </div>
                    <Link className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5
      transition duration-500 ease select-none hover:text-white
      hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full' href={'/'}>Back to home page</Link>
                </div>
                <div className='w-1/4'>
                    <CategoryList categories={categories} />
                </div>
            </div>

    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const categories = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  })
  //mapiramo svaku kategoriju kao vrednost kljuca category_name
  const paths = categories.map(category => ({
    params: { category_name: category }
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { category_name } }) {
  //ucitavamo direktorijum i pravimo niz od naziva njegovih fajlova
  const files = fs.readdirSync(path.join('posts'));
  //mapiramo niz naziva ovih fajlova
  const posts = getPosts();

  //get categories for sidebar
  const categories = posts.map(post => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];
  //filtriramo postove po kategoriji
  const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name
  )
  return {
    props: {
      posts: categoryPosts.sort(sortByDate),
      categoryName: category_name,
      categories:uniqueCategories
    },
  }
}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
export default function PostPage(props) {
  return (
    <div>

    </div>
  )
}
export async function getStaticPaths(){
const files=fs.readdirSync(path.join('posts'));
const paths=files.map(filename=>{
    params:{
        slug:filename.replace('.md', '')
    }
})

return{
    paths,
    fallback:false
}
}
 export async function getStaticProps({params:{slug}}){
    //hocemo da ucitamo fajl, slug je naziv falja bez ekstencije, pa ga spajamo sa md ekstenzijom
    const markdownWithMeta=fs.readFileSync(path.join('posts', slug + '.md', 'utf-8'))
    const {data, content}=matter(markdownWithMeta);
    return {
        props:{},
    }
 }
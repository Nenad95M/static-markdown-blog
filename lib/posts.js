//importujemo node module, mozemo samo da ih koristimo unutar getStaticProps koji ide na serveru
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index';

//ucitavamo direktorijum i pravimo niz od naziva njegovih fajlova
const files = fs.readdirSync(path.join('posts'));

export function getPosts(){
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

  //vracamo postove sortirane po datumu
  return posts.sort(sortByDate)
}
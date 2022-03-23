import MDXComponents from '@/components/MDXComponents'
import fs from 'fs'
import matter from 'gray-matter'
// import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import readingTime from 'reading-time'
import visit from 'unist-util-visit'
// import imgToJsx from './img-to-jsx'
import getAllFilesRecursively from './utils/files'

import { serialize } from 'next-mdx-remote/serialize'

const root = process.cwd()

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export const getPosts = (limit) => {
  const dirFiles = fs.readdirSync(path.join(process.cwd(), 'data', 'blog'), {
    withFileTypes: true,
  })

  const posts = dirFiles
    .map((file) => {
      if (!file.name.endsWith('.mdx')) return

      const fileContent = fs.readFileSync(
        path.join(process.cwd(), 'data', 'blog', file.name),
        'utf-8'
      )
      const { data, content } = matter(fileContent)
      // console.log({data });
      const slug = file.name.replace(/.mdx$/, '')
      return { data, content, slug }
    })
    .filter((post) => post)

  if (limit) {
    return posts.filter((post, index) => {
      return index + 1 <= limit
    })
  }

  return posts
}

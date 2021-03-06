import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

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
      const slug = file.name.replace(/.mdx$/, '')
      return { data, content, slug }
    })
    .filter((post) => post)

  if (limit) {
    return posts.filter((_post, index) => {
      return index + 1 <= limit
    })
  }

  return posts
}

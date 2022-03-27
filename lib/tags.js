import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getPosts } from './mdx'
import kebabCase from './utils/kebabCase'

const root = process.cwd()

export function getAllTags() {
  const files = getPosts()

  let tagCount = {}
  files.forEach((file) => {
    const { data } = file
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}

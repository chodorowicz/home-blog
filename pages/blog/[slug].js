import MDXComponents from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import PostLayout from '@/layouts/PostLayout'
import { getPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

export async function getStaticPaths() {
  const posts = getPosts()
  const paths = {
    paths: posts.map((p) => ({
      params: {
        slug: p.slug,
      },
    })),
    fallback: false,
  }

  return paths
}

export async function getStaticProps({ params }) {
  const allPosts = await getPosts()
  const postIndex = allPosts.findIndex((post) => post.slug === params.slug)
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = allPosts.find((p) => p.slug === params.slug)
  const { frontMatter, content } = post
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: frontMatter,
  })

  return { props: { post, prev, next, mdxSource } }
}

export default function Blog({ post, prev, next, mdxSource }) {
  const { data } = post

  return (
    <>
      {data.draft !== true ? (
        <PostLayout frontMatter={data} prev={prev} next={next}>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </PostLayout>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}

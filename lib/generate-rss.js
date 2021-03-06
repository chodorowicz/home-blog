import siteMetadata from '@/data/siteMetadata'

const generateRssItem = (post) => {
  return `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${post.data.title}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    <description>${post.data.summary}</description>
    <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.data.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>`
}

const generateRss = (posts, page = 'index.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${siteMetadata.title}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${siteMetadata.description}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].data.date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`
export default generateRss

import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft)

  return rss({
    title: 'Evgeny Klimenchenko',
    description:
      'Software Engineer, writer and photographer living in London, UK. Articles about web development and the developer lifestyle.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.publishedDate,
        description: post.data.summary,
        link: `/blog/${post.slug}/`,
      })),
    customData: '<language>en</language>',
  })
}

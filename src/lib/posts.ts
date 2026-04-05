import { getCollection } from 'astro:content'
import externalPosts from '../data/external-posts.json'

export type AnyPost = {
  title: string
  summary: string
  imgSrc: string
  publishedDate: Date
  slug?: string
  url?: string
  publisher?: string
}

export async function getAllPosts(): Promise<AnyPost[]> {
  const internal = await getCollection('blog', ({ data }) => !data.draft)

  const internalMapped: AnyPost[] = internal.map((post) => ({
    title: post.data.title,
    summary: post.data.summary,
    imgSrc: post.data.imgSrc,
    publishedDate: post.data.publishedDate,
    slug: post.slug,
  }))

  const externalMapped: AnyPost[] = externalPosts.map((p) => ({
    title: p.title,
    summary: p.summary,
    imgSrc: p.imgSrc,
    publishedDate: new Date(p.publishedDate),
    url: p.url,
    publisher: p.publisher,
  }))

  return [...internalMapped, ...externalMapped].sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime(),
  )
}

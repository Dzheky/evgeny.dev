import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    imgSrc: z.string(),
    publishedDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }

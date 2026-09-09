import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    // Blog posts
    insights: defineCollection({
      type: 'page',
      source: 'insights/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.any(),
        tags: z.array(z.string()).default([]),
        category: z.string().optional(),
        draft: z.boolean().default(false),
        cover: z.string().optional(),
        readTime: z.number().optional(),
      }),
    }),

    // Lab / OSS projects
    lab: defineCollection({
      type: 'data',
      source: 'lab/**/*.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        tags: z.array(z.string()).default([]),
        link: z.string().optional(),
        docs: z.string().optional(),
        repo: z.string().optional(),
        language: z.string().optional(),
        isOpenSource: z.boolean().default(true),
        date: z.any().optional(),
      }),
    }),
  },
});

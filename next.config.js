const readingTime = require('reading-time')
const mdxPrism = require('mdx-prism')
const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  remarkPlugins: [],
  rehypePlugins: [mdxPrism],
  extendFrontMatter: {
    process: (mdxContent) => ({
      readingTime: readingTime(mdxContent),
    }),
  },
})({
  experimental: {
    modern: true,
  },
})

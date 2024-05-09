import createMDX from '@next/mdx'
import remarkSlug from 'remark-slug'
import remarkMath from 'remark-math'
import remarkCodeTitles from 'remark-code-titles'
import remarkFootnotes from 'remark-footnotes'
import remarkExternalLinks from 'remark-external-links'
import remarkAutolinkHeadings from 'remark-autolink-headings'


const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkSlug,
      remarkMath,
      remarkCodeTitles,
      remarkFootnotes,
      remarkExternalLinks,
      remarkAutolinkHeadings,
    ],
  },
})

export default withMDX(nextConfig)

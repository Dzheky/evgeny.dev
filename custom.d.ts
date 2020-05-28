declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.mdx' {
  interface frontMatter {
    title: string
    publishedDate: string
    summary: string
  }
  export const frontMatter: frontMatter
}

declare module '*.css' {}

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.mdx' {
  import { FrontMatter } from './interfaces/posts'
  export const frontMatter: FrontMatter | FrontMatter[]
}

declare module '*.css' {}

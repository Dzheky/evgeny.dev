declare module '*.mdx' {
  import { FrontMatter } from './interfaces/posts'
  export const frontMatter: FrontMatter | FrontMatter[]
}

declare module '*.css' {}

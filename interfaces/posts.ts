export enum externalSources {
  CSS_TRICKS = 'css-tricks',
}

export interface FrontMatter {
  title: string
  url?: string
  publishedDate: string
  imgSrc: string
  publisher?: externalSources
  __resourcePath?: string
  summary: string
  readingTime?: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

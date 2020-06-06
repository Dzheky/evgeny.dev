export interface FrontMatter {
  title: string
  publishedDate: string
  imgSrc: string
  __resourcePath: string
  summary: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export interface FrontMatter {
  title: string
  publishedDate: string
  summary: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export const format = (num: number) => {
  return new Intl.NumberFormat('en').format(num)
}

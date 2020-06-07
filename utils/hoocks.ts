import { useEffect, useState } from 'react'

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(
    process.browser ? window?.pageYOffset : 0,
  )

  useEffect(() => {
    if (process.browser) {
      let last_known_scroll_position = 0
      let ticking = false
      const handleScroll = () => {
        last_known_scroll_position = window.scrollY

        if (!ticking) {
          window.requestAnimationFrame(function () {
            setScrollPosition(last_known_scroll_position)
            ticking = false
          })

          ticking = true
        }
      }
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  })

  return scrollPosition
}

/// <reference types="next" />
/// <reference types="next/types/global" />

/// Styled components
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      primaryRGB: string
      invert: string
      invertRGB: string
      orange: string
      gray: string
      lightGray: string
      backgroundColor: string
      backgroundColorRBG: string
    }
  }
}

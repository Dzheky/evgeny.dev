/// <reference types="next" />
/// <reference types="next/types/global" />

/// Styled components
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      orange: string
      backgroundColor: string
      backgroundColorRBG: string
    }
  }
}

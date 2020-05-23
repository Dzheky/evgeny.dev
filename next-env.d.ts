/// <reference types="next" />
/// <reference types="next/types/global" />

/// Styled Components
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      orange: string
    }
  }
}

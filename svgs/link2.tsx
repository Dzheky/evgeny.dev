import React from 'react'

const Link2 = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    color="inherit"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.49998 1.5L8.14648 3.1465L4.64648 6.6465L5.35348 7.3535L8.85348 3.8535L10.5 5.5V1.5H6.49998Z"
      fill="currentColor"
    />
    <path
      d="M9.5 9.5H2.5V2.5H6L5 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V7L9.5 6V9.5Z"
      fill="currentColor"
    />
  </svg>
)

export default Link2

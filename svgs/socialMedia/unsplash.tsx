import React from 'react'

const Unsplash = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    color="inherit"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Unsplash icon</title>
    <path
      d="M7.54688 7.05512V2.625H13.4531V7.05512H7.54688ZM13.4531 9.51562H18.375V18.375H2.625V9.51562H7.54688V13.9457H13.4531V9.51562Z"
      fill="currentColor"
    />
  </svg>
)

export default Unsplash

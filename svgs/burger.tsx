import React from 'react'

const BurgerIcon = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 15"
    color="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="0" y1="1.5" x2="30" y2="1.5" stroke="currentColor" strokeWidth="3" />
    <line x1="0" y1="7.5" x2="30" y2="7.5" stroke="currentColor" strokeWidth="3" />
    <line x1="0" y1="13.5" x2="30" y2="13.5" stroke="currentColor" strokeWidth="3" />
  </svg>
)

export default BurgerIcon

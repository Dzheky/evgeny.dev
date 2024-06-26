import React from 'react'

const FacebookFilled = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    color="inherit"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Facebook icon</title>
    <g clipPath="url(#facebookIconClip)">
      <path
        d="M4.01707 0.541504C1.79179 0.541504 0 2.37062 0 4.64226V18.8991C0 21.1707 1.79179 22.9999 4.01707 22.9999H11.5865V14.22H9.3122V11.059H11.5865V8.35842C11.5865 6.23667 12.9302 4.28854 16.0256 4.28854C17.2789 4.28854 18.2057 4.41137 18.2057 4.41137L18.1328 7.36325C18.1328 7.36325 17.1876 7.35413 16.1562 7.35413C15.04 7.35413 14.861 7.87916 14.861 8.75077V11.0591H18.2215L18.0751 14.2201H14.861V22.9999H17.9829C20.2082 22.9999 22 21.1708 22 18.8991V4.64228C22 2.37065 20.2082 0.541526 17.9829 0.541526H4.01705L4.01707 0.541504Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="facebookIconClip">
        <rect
          width="22"
          height="22.4583"
          fill="currentColor"
          transform="translate(0 0.541504)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default FacebookFilled

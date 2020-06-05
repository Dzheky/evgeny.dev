import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface Modal {
  children: ReactNode
}

const Modal = ({ children }: Modal) => {
  if (process.browser) {
    const domNode = document?.getElementById('modal')
    if (domNode) {
      return ReactDOM.createPortal(children, domNode)
    }
  }
  return null
}

export default Modal

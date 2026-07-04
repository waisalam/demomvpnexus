import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null)

  // Create a dedicated root element for portals
  useEffect(() => {
    const root = document.createElement('div')
    root.setAttribute('id', 'modal-root')
    document.body.appendChild(root)
    setModalRoot(root)
    return () => {
      document.body.removeChild(root)
      setModalRoot(null)
    }
  }, [])

  // Focus trap, ESC dismiss, and focus restore
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement

      const timer = setTimeout(() => {
        if (overlayRef.current) {
          const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable.length) {
            focusable[0].focus()
          }
        }
      }, 0)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
          return
        }

        if (e.key === 'Tab' && overlayRef.current) {
          const focusable = Array.from(
            overlayRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          )
          if (focusable.length === 0) return

          const first = focusable[0]
          const last = focusable[focusable.length - 1]

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => {
        clearTimeout(timer)
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
      previousActiveElement.current = null
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close only if the overlay itself (not its children) was clicked
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!isOpen || !modalRoot) return null

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {children}
      </div>
    </div>,
    modalRoot
  )
}

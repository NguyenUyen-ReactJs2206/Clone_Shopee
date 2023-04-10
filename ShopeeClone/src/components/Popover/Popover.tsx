import React, { ElementType, useId, useRef, useState } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset, type Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}
export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement
}: Props) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const id = useId()
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),

      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }

  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <AnimatePresence>
        {open && (
          <FloatingPortal id={id}>
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='absolute -translate-y-full border-[11px] border-x-transparent border-b-white border-t-transparent'
                style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
              ></span>
              {renderPopover}
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </Element>
  )
}

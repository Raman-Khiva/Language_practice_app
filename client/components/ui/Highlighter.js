"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"

const DEFAULT_OPTIONS = {
  action: "highlight",
  color: "#ffd1dc",
  strokeWidth: 1.5,
  animationDuration: 600,
  iterations: 2,
  padding: 2,
  multiline: true,
  isView: false,
}

export function Highlighter(props) {
  const {
    children,
    action = DEFAULT_OPTIONS.action,
    color = DEFAULT_OPTIONS.color,
    strokeWidth = DEFAULT_OPTIONS.strokeWidth,
    animationDuration = DEFAULT_OPTIONS.animationDuration,
    iterations = DEFAULT_OPTIONS.iterations,
    padding = DEFAULT_OPTIONS.padding,
    multiline = DEFAULT_OPTIONS.multiline,
    isView = DEFAULT_OPTIONS.isView,
  } = props

  const elementRef = useRef(null)
  const annotationRef = useRef(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useEffect(() => {
    if (!shouldShow) return

    const element = elementRef.current
    if (!element) return

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    }

    const annotation = annotate(element, annotationConfig)

    annotationRef.current = annotation
    annotationRef.current.show()

    const resizeObserver = new ResizeObserver(() => {
      annotation.hide()
      annotation.show()
    })

    resizeObserver.observe(element)
    resizeObserver.observe(document.body)

    return () => {
      if (element) {
        annotate(element, { type: action }).remove()
        resizeObserver.disconnect()
      }
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}

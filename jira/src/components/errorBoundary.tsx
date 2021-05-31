import React from 'react'
import type { ReactNode, ReactElement, PropsWithChildren } from 'react'

type FallBackRenderType = (props: { error: Error | null }) => ReactElement

interface ErrorBoundaryPropsType {
  fallbackRender: FallBackRenderType
}

export class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryPropsType>, { error: Error | null }> {
  state = {
    error: null
  }

  // 当子组件抛出异常，这里会接收到并调用
  static getDerivedStateFromError (error: Error) {
    return { error }
  }

  render () {
    const { error } = this.state
    const { fallbackRender, children } = this.props

    if (error) {
      return fallbackRender({error})
    }

    return children
  }
}

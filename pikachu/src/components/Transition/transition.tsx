import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

interface TransitionAnimationProps {
  animation?: AnimationName,
  wrapper?: boolean
}

export type TransitionProps = TransitionAnimationProps & CSSTransitionProps

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, animation, classNames, wrapper, ...resetProps } = props
  
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...resetProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition

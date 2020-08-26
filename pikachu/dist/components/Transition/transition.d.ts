import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom';
interface TransitionAnimationProps {
    animation?: AnimationName;
    wrapper?: boolean;
}
export declare type TransitionProps = TransitionAnimationProps & CSSTransitionProps;
declare const Transition: React.FC<TransitionProps>;
export default Transition;

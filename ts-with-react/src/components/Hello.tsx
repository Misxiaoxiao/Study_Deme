import React from 'react';

interface IProps {
  message?: string
}

const Hello: React.FC<IProps> = (props: IProps) => {
  return (
    <h2>{props.message}</h2>
  )
}

Hello.defaultProps = {
  message: 'Hello World'
}

export default Hello;

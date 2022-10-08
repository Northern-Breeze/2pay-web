import * as React from 'react'
import './Button.scss';

type Props = {
    children: React.ReactNode,
    type: 'primary' | 'secondary' | 'tertiary',
    clickHandler(): void,
}

export default function Button(props: Props) {
    const { children, type, clickHandler } = props;
  return (
    <button className={`btn btn-${type}`} onClick={clickHandler}>
        {children}
    </button>
  )
}

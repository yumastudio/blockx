import { createElement, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Title.module.scss';

interface TitlePropsType {
  children: ReactNode,
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  className?: string,
  heading?: 1 | 2 | 3 | 4 | 5 | 6,
  id?: string
}

export default function Title({
  children,
  id,
  size = 1,
  className,
  heading
}: TitlePropsType): JSX.Element {
  const elementName = heading ? `h${heading}` : 'div';

  const props = {
    className: classNames(styles[`title${size}`], "font-700", className),
    id,
  };

  return createElement(elementName, props, children);
}

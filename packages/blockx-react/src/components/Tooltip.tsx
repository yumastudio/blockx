import React, { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { assign } from 'lodash';
import classNames from 'classnames';
import { usePopper } from 'react-popper';

import styles from './Tooltip.module.scss';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const doesWindowSupportTouch = (): boolean =>
  typeof window !== 'undefined' && 'ontouchstart' in window;

interface TooltipPropsType {
  children: ReactNode;
  text: string;
  theme?: 'light' | 'dark';
  position?: 'top' | 'bottom';
  closeDelayLength?: 0 | 200;
  zIndex?: number;
  className?: string;
}

export default function Tooltip({
  position = 'top',
  theme = 'dark',
  zIndex,
  text,
  children,
  closeDelayLength = 200,
  className
}: TooltipPropsType): JSX.Element {
  const [referenceElement, setReferenceElement] = useState<any | null>(null);
  const [popperElement, setPopperElement] = useState<any | null>(null);
  const [arrowElement, setArrowElement] = useState<any | null>(null);
  const { attributes, styles: popperStyles } = usePopper(referenceElement, popperElement, {
    placement: position,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8],
      }
    }, {
      name: 'preventOverflow',
      options: {
        boundary: 'window',
      }
    }, {
      name: 'arrow',
      options: {
        element: arrowElement
      }
    }],
    positionFixed: false
  })
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTimeout, setOpenTimeout] = useState<number | undefined>(undefined);
  const [closeTimeout, setCloseTimeout] = useState<number | undefined>(undefined);

  const show = (): void => {
    if(closeTimeout){
      window.clearTimeout(closeTimeout);
    }
    setIsOpen(true);
  };

  const hide = (): void => {
    setIsOpen(false);
  };

  const onFocus = (): void => {
    if(!doesWindowSupportTouch()){
      show();
    }
  };

  const onMouseEnter = (): void => {
    if(!doesWindowSupportTouch()){
      setOpenTimeout(window.setTimeout(show, 100));
    }
  };

  const onMouseLeave = (): void => {
    setCloseTimeout(window.setTimeout(hide, closeDelayLength));
    if (openTimeout) {
      clearTimeout(openTimeout);
    }
  };

  const onClick = (): void => {
    if(doesWindowSupportTouch()){
      if(isOpen){
        hide();
      }else{
        show();
      }
    }
  };

  useEffect((): (() => void) => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (canUseDOM && event.keyCode === 27) {
        event.preventDefault();
        hide();
      }
    };

    setIsLoaded(true)

    document.addEventListener('keyup', handleKeyUp);
    return (): void => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const placement = attributes.popper ? attributes.popper['data-popper-placement'] : null

  const popper = isOpen && (
    <div
      ref={setPopperElement}
      role="tooltip"
      className={classNames({
        [styles.tooltip]: true,
        [styles.tooltipThemeDark]: theme === 'dark',
        [styles.tooltipThemeLight]: theme === 'light',
      })}
      style={assign({}, popperStyles.popper, { zIndex })}
      onMouseEnter={show}
      onMouseLeave={onMouseLeave}
      onClick={(event): void => {
        event.stopPropagation();
        if (doesWindowSupportTouch()) {
          hide();
        }
      }}
      {...attributes.popper}
    >
      <div>{ text }</div>
      <div
        ref={setArrowElement}
        style={popperStyles.arrow}
        className={classNames({
          [styles.arrow]: true,
          [styles.arrowPositionTop]: placement === 'top',
          [styles.arrowPositionBottom]: placement === 'bottom',
          [styles.arrowThemeDark]: theme === 'dark',
          [styles.arrowThemeLight]: theme === 'light',
        })}
      />
    </div>
  )

  return (
    <>
      <div
        className={classNames("inline-block", className)}
        ref={setReferenceElement}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={hide}
        aria-label={text}
      >
        { children }
      </div>
      {
        (isLoaded && canUseDOM)
        ? createPortal(popper, document.body)
        : popper
      }
    </>
  )
}

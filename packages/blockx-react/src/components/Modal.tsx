import React, { ReactNode, useEffect } from 'react'
import classNames from "classnames"
import noScroll from 'no-scroll'

import { CrossIcon } from "@yumastudio/blockx-icons"

import styles from "./Modal.module.scss"

interface ModalPropsType {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  shouldHideCloseButton?: boolean;
  shouldModalScroll?: boolean;
  shouldCloseOnCurtainClick?: boolean;
  width?: 'small' | 'medium' | 'large';
  height?: 'auto' | 'medium' | 'large';
  onClose(): void;
}

export default function Modal({
  children,
  isOpen,
  className,
  width = 'medium',
  height = 'auto',
  shouldHideCloseButton = false,
  shouldModalScroll = true,
  shouldCloseOnCurtainClick = true,
  onClose
}: ModalPropsType) {
  useEffect(() => {
    if(isOpen) noScroll.on()
    else noScroll.off()
  }, [isOpen])

  const onClickCurtain = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div role="dialog" aria-label="Modal" tabIndex={-1}>
      <div className={classNames({
        [styles.curtain]: true,
        [styles.curtainOpen]: isOpen
      })}>
        <div onClick={shouldCloseOnCurtainClick ? onClickCurtain : undefined} className={classNames({
          [styles.curtainInner]: true,
          [styles.curtainInnerScroll]: shouldModalScroll
        })}>
          <div className={classNames({
            [styles.modal]: true,
            [styles.modalOpen]: isOpen,
            [styles.modalWidthSmall]: width === 'small',
            [styles.modalWidthMedium]: width === 'medium',
            [styles.modalWidthLarge]: width === 'large',
            [styles.modalHeightMedium]: height === 'medium',
            [styles.modalHeightLarge]: height === 'large',
            [styles.modalShouldScroll]: shouldModalScroll
          }, className)}>
            <div className={styles.container}>
              {!shouldHideCloseButton && (
                <div className={styles.closeButton}>
                  <div className="m-3">
                    <button onClick={onClose}>
                      <CrossIcon size="medium"/>
                    </button>
                  </div>
                </div>
              )}
              <div className={styles.content}>
                <div className={styles.contentPadding}>
                  { children }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

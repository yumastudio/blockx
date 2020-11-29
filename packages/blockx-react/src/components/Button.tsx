import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import LoaderDots from './LoaderDots';
import { isString } from 'lodash';

import styles from './Button.module.scss';

enum loaderDotsTheme {
  primary = 'inverse',
  secondary = 'brand',
  tertiary = 'muted'
}

const bolidDomainPattern = /^(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)*bolid\.be\//;
const rootRelativeUrlPattern = /^\//;
const hashUrlPattern = /^#/;

const isInternalUrl = (href?: string): boolean =>
    isString(`${href}`) && (
      bolidDomainPattern.test(`${href}`)
      || rootRelativeUrlPattern.test(`${href}`)
      || hashUrlPattern.test(`${href}`)
    )

const getRel = (href?: string, shouldOpenInNewTab = false): string | undefined => {
  if (shouldOpenInNewTab) {
    if (isInternalUrl(href)) {
      return 'noopener';
    }
    return 'noopener noreferrer';
  }
  return undefined;
};

interface AnchorPropsType {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
  target: string,
  rel?: string,
  href?: string
}

const getAnchorProps = ({
  isDisabled,
  shouldOpenInNewTab,
  onClick,
  href
}: {
  isDisabled?: boolean,
  shouldOpenInNewTab?: boolean,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
  href?: string
}): AnchorPropsType => ({
  onClick: isDisabled ? undefined : onClick,
  target: shouldOpenInNewTab ? '_blank' : '_self',
  rel: getRel(href, shouldOpenInNewTab),
  href: isDisabled ? undefined : href
});

interface ButtonPropsType {
  children?: ReactNode,
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
  isDisabled?: boolean,
  isLoading?: boolean,
  onClick?: () => void,
  href?: string,
  shouldOpenInNewTab?: boolean,
  theme?: 'primary' | 'secondary' | 'tertiary' | 'caution' | 'solid',
  size?: 'small' | 'large',
  type?: 'button' | 'submit',
  className?: string
}

const FlexWrapper = ({
  children,
  size
}: {
  children: ReactNode | string,
  size: 'small' | 'large'
}) => (
  <div className={classNames({
    [styles.flexWrapper]: true,
    [styles.flexWrapperSizeSmall]: size === 'small',
    [styles.flexWrapperSizeLarge]: size === 'large'
  })}>
    { children }
  </div>
)

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonPropsType>(
  ({
    children,
    iconLeft,
    iconRight,
    isDisabled = false,
    isLoading = false,
    onClick,
    href,
    shouldOpenInNewTab,
    theme = 'primary',
    size = 'large',
    type = 'button',
    className
  }: ButtonPropsType, ref): JSX.Element => {
    const commonProps = {
      disabled: isLoading || isDisabled,
      className: classNames({
        [styles.button]: true,
        [styles.buttonThemePrimary]: theme === 'primary',
        [styles.buttonThemeTertiary]: theme === 'tertiary',
        [styles.buttonThemeSecondary]: theme === 'secondary',
        [styles.buttonThemeCaution]: theme === 'caution',
        [styles.buttonThemeSolid]: theme === 'solid'
      }, className)
    }

    const restrictedTheme =
      theme === 'primary' || theme === 'secondary' || theme === 'tertiary'
      ? theme
      : undefined

    const newChildren = isLoading
    ? (
      <FlexWrapper size={size}>
        <span className={styles.loaderContainer}>
          <span className={styles.absoluteCenter}>
            <LoaderDots theme={restrictedTheme ? loaderDotsTheme[restrictedTheme] : restrictedTheme} size="small" />
          </span>
          <span className="invisible">{children}</span>
        </span>
      </FlexWrapper>
    ) : (
      <FlexWrapper size={size}>
        {
          iconLeft && (
            <span
              className={classNames({
                [styles.iconContainer]: true,
                [styles.iconContainerHasRightChildren]: children,
              })}
            >
              { iconLeft }
            </span>
          )
        }
        { children }
        {
          iconRight && (
            <span
              className={classNames({
                [styles.iconContainer]: true,
                [styles.iconContainerHasLeftChildren]: children,
              })}
            >
              { iconLeft }
            </span>
          )
        }
      </FlexWrapper>
    )

    const isAnchor = !!href
    if (isAnchor) {
      return (
        <a
          {...commonProps}
          {
            ...getAnchorProps({
              isDisabled,
              shouldOpenInNewTab,
              onClick,
              href
            })
          }
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
            { newChildren }
        </a>
      )
    }

    const buttonProps = {
      onClick: isDisabled || isLoading ? undefined : onClick,
      type
    }

    return (
      <button
        {...commonProps}
        {...buttonProps}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        { newChildren }
      </button>
    )
  }
)

export default Button

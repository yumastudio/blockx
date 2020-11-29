import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Image from './Image';

import styles from './Avatar.module.scss';

const dimensions = {
  xsmall: '32px',
  small: '48px',
  medium: '72px',
  large: '100px',
  xlarge: '140px',
};

const CLASSNAMES: string[] = [
  styles.avatarTheme1,
  styles.avatarTheme2,
  styles.avatarTheme3,
  styles.avatarTheme4,
  styles.avatarTheme5
];

const getClassName = (initials?: string): string =>
  initials
    ? CLASSNAMES[initials.charCodeAt(0) % CLASSNAMES.length]
    : CLASSNAMES[0];

interface EntityAvatarPropsType {
  imageUrl?: string,
  initial?: string,
  fullName?: string,
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
  className?: string
}

const EntityAvatar = forwardRef<HTMLElement, EntityAvatarPropsType>(
  ({
    imageUrl,
    size = 'small',
    initial,
    fullName,
    className
  }: EntityAvatarPropsType, outerRef ): JSX.Element => {
    return (
      <div
        className={classNames(styles.avatar, {
          [styles.avatarSizeXsmall]: size === 'xsmall',
          [styles.avatarSizeSmall]: size === 'small',
          [styles.avatarSizeMedium]: size === 'medium',
          [styles.avatarSizeLarge]: size === 'large',
          [styles.avatarSizeXlarge]: size === 'xlarge',
        }, className)}
        style={{ width: dimensions[size], height: dimensions[size] }}
      >
        {imageUrl ? (
          <Image
            className={styles.square}
            src={imageUrl}
            alt={fullName ? `Avatar for ${fullName}` : 'Avatar'}
            height={typeof size === 'string' ? dimensions[size] : `${size}px`}
            ref={outerRef}
          />
        ) : (
          <span
            className={`${styles.initials} ${styles.square} ${getClassName(initial)}`}
            title={fullName && `Avatar for ${fullName}`}
          >
            {initial}
          </span>
        )}
      </div>
    );
  },
);

// Needed because of the `forwardRef`.
EntityAvatar.displayName = 'EntityAvatar';

interface UserAvatarPropsType {
  imageUrl?: string,
  initials?: string,
  fullName?: string,
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
  className?: string
}

const UserAvatar = forwardRef<HTMLElement, UserAvatarPropsType>(
  ({
    imageUrl,
    size = 'small',
    initials,
    fullName,
    className
  }: UserAvatarPropsType, outerRef): JSX.Element => {
    return (
      <div
        className={classNames(styles.avatar, {
          [styles.avatarSizeXsmall]: size === 'xsmall',
          [styles.avatarSizeSmall]: size === 'small',
          [styles.avatarSizeMedium]: size === 'medium',
          [styles.avatarSizeLarge]: size === 'large',
          [styles.avatarSizeXlarge]: size === 'xlarge',
        }, className)}
        style={{ width: dimensions[size], height: dimensions[size] }}
      >
        {imageUrl ? (
          <Image
            className={styles.circle}
            src={imageUrl}
            alt={fullName ? `Avatar for ${fullName}` : 'Avatar'}
            height={typeof size === 'string' ? dimensions[size] : `${size}px`}
            ref={outerRef}
          />
        ) : (
          <span
            className={`${styles.initials} ${styles.circle} ${getClassName(initial)}`}
            title={fullName && `Avatar for ${fullName}`}
          >
            {initials}
          </span>
        )}
      </div>
    );
  },
);

// Needed because of the `forwardRef`.
UserAvatar.displayName = 'UserAvatar';

export { UserAvatar, EntityAvatar };

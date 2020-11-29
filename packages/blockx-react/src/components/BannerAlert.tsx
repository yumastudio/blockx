import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './BannerAlert.module.scss';
import { WarningFillIcon, InfoFillIcon, StopFillIcon } from '@yumastudio/blockx-icons';

const ALERT_ICONS = {
  caution: <StopFillIcon size="medium" className={styles.icon} />,
  info: <InfoFillIcon size="medium" className={styles.icon} />,
  warning: <WarningFillIcon size="medium" className={styles.icon} />,
};

interface BannerAlertPropsType {
  children: ReactNode,
  theme: 'info' | 'warning' | 'caution',
  className?: string
}

export default function AlertBanner({
  children,
  theme,
  className
}: BannerAlertPropsType): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.bannerAlert]: true,
        [styles.bannerAlertStateCaution]: theme === 'caution',
        [styles.bannerAlertStateInfo]: theme === 'info',
        [styles.bannerAlertStateWarning]: theme === 'warning',
      }, className)}
    >
      { ALERT_ICONS[theme] }
      <div>{ children }</div>
    </div>
  );
}

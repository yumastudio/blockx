import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Radio.module.scss';

const labelCursor = {
  disabled: 'default',
  checked: 'pointer',
  unchecked: 'pointer',
  error: 'pointer',
};

type UiState = 'disabled' | 'error' | 'checked' | 'unchecked';

const getUIState = ({
  isChecked,
  isDisabled,
  hasError,
}: Pick<RadioPropsType, 'isDisabled' | 'hasError' | 'isChecked'>): UiState => {
  if (isDisabled) {
    return 'disabled';
  }

  if (hasError) {
    return 'error';
  }

  if (isChecked) {
    return 'checked';
  }

  return 'unchecked';
};

interface RadioPropsType {
  isDisabled?: boolean,
  children?: ReactNode,
  id?: string,
  isChecked?: boolean,
  isRequired?: boolean,
  hasError?: boolean,
  name: string,
  labelPadding?: string,
  onChange: (isChecked: boolean, id?: string) => void,
  radioVerticalAlign?: 'top' | 'center',
  className?: string
}

export default function Radio({
  children = null,
  id,
  isChecked = false,
  isDisabled = false,
  isRequired = false,
  hasError = false,
  labelPadding = '14px 0',
  name,
  onChange,
  radioVerticalAlign = 'center',
  className
}: RadioPropsType): JSX.Element {
  const uiState = getUIState({ isChecked, isDisabled, hasError });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
    <label
      className={classNames(styles.radio, {
        [styles.radioRadioVerticalAlignTop]: radioVerticalAlign === 'top',
        [styles.radioRadioVerticalAlignCenter]: radioVerticalAlign === 'center',
      }, className)}
      style={{ padding: labelPadding, cursor: labelCursor[uiState] }}
    >
      <input
        className={styles.input}
        type="radio"
        id={id}
        onChange={(event): void => onChange(event.target.checked, id)}
        checked={isChecked}
        name={name}
        disabled={isDisabled}
        required={isRequired}
      />

      <svg
        className={styles.circle}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={classNames({
          [styles.circleBackgroundStateDisabled]: uiState === 'disabled',
          [styles.circleBackgroundStateChecked]: uiState === 'checked',
          [styles.circleBackgroundStateUnchecked]: uiState === 'unchecked',
          [styles.circleBackgroundStateError]: uiState === 'error'
        })} fillRule="evenodd">
          <circle className={classNames({
            [styles.circleBorderStateDisabled]: uiState === 'disabled',
            [styles.circleBorderStateChecked]: uiState === 'checked',
            [styles.circleBorderStateUnchecked]: uiState === 'unchecked',
            [styles.circleBorderStateError]: uiState === 'error'
          })} strokeWidth="2" cx="10" cy="10" r="9" />
          {isChecked && (
            <circle className={classNames({
              [styles.circleRadioStateDisabled]: uiState === 'disabled',
              [styles.circleRadioStateChecked]: uiState === 'checked',
              [styles.circleRadioStateUnchecked]: uiState === 'unchecked',
              [styles.circleRadioStateError]: uiState === 'error'
            })} cx="10" cy="10" r="6" />
          )}
        </g>
      </svg>

      {
        children && (
          <span className={classNames({
            [styles.text]: true,
            [styles.textStateDisabled]: uiState === 'disabled',
            [styles.textStateChecked]: uiState === 'checked',
            [styles.textStateUnchecked]: uiState === 'unchecked',
            [styles.textStateError]: uiState === 'error'
          })}>
            {children}
          </span>
        )
      }
    </label>
  );
}

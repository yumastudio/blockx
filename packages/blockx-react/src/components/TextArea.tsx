import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Label from "./subcomponents/Label"
import InputNote from "./subcomponents/InputNote"

import styles from './TextArea.module.scss';

type UiState = 'disabled' | 'error' | 'default';

const getUIState = ({
  hasError,
  isDisabled,
}: {
  hasError: boolean;
  isDisabled: boolean;
}): UiState => {
  if (isDisabled) {
    return 'disabled';
  }
  if (hasError) {
    return 'error';
  }
  return 'default';
};

interface TextAreaPropsType {
  id?: string,
  isDisabled?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  hasError?: boolean,
  placeholder?: string,
  name?: string,
  value: string,
  maxLength?: number,
  onChange: (newValue: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  className?: string,
  label?: ReactNode,
  note?: ReactNode,
}

export default function TextArea ({
  hasError = false,
  id,
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  maxLength,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  value,
  name,
  className,
  label,
  note
}: TextAreaPropsType): JSX.Element {
  const uiState = getUIState({ hasError, isDisabled });

  return (
    <div className={className}>
      {
        label && (
          <Label {...{ hasError, isDisabled }} className="mb-1">{ label }</Label>
        )
      }
      <textarea
        className={classNames({
          [styles.textArea]: true,
          [styles.textAreaStateDisabled]: uiState === 'disabled',
          [styles.textAreaStateError]: uiState === 'error',
          [styles.textAreaStateDefault]: uiState === 'default',
        })}
        id={id}
        disabled={isDisabled}
        readOnly={isReadOnly}
        maxLength={maxLength}
        required={isRequired}
        placeholder={placeholder}
        value={value}
        onChange={(event): void => onChange(event.target.value, event)}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
      />
      {
        note && (
          <InputNote className="mt-1" hasError={hasError}>{ note }</InputNote>
        )
      }
    </div>
  );
};

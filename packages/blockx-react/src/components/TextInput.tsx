import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import Label from "./subcomponents/Label"
import InputNote from "./subcomponents/InputNote"

import styles from './TextInput.module.scss';

type UiState = 'disabled' | 'readonly' | 'error' | 'default';

/**
 * Prioritize the mutually exclusive UI states the user may end up in.
 */
const getUIState = ({
  isDisabled,
  isReadOnly,
  hasError,
}: Pick<TextInputPropsType, 'isDisabled' | 'isReadOnly' | 'hasError'>): UiState => {
  if (isDisabled) {
    return 'disabled';
  }

  if (isReadOnly) {
    return 'readonly';
  }

  if (hasError) {
    return 'error';
  }

  return 'default';
};

/**
 * Component that helps position icons within inputs.
 */
interface TextInputPropsType {
  id?: string,
  isDisabled?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  /**
   * A regular expression that the `<input>` element's value is checked against when submitting a
   * form.
   */
  pattern?: string,
  maxLength?: number,
  hasError?: boolean,
  placeholder?: string,
  size?: 'small' | 'large',
  type?: 'email' | 'password' | 'text' | 'search' | 'tel' | 'number',
  /**
   * A [proposed specification](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)
   * that enables specification of virtual keyboard type in Chrome. Currently only supported in
   * Chrome and Android.
   */
  inputMode?: 'numeric',
  name?: string,
  value?: string | number,
  iconLeft?: ReactNode,
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void,
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void,
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'],
  className?: string,
  label?: ReactNode,
  note?: ReactNode,
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputPropsType>(
  (
    {
      id,
      type = 'text',
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      hasError = false,
      placeholder,
      size = 'large',
      name,
      value = '',
      iconLeft,
      onClick = (): void => {},
      onChange = (): void => {},
      onFocus = (): void => {},
      onBlur = (): void => {},
      onKeyDown = (): void => {},
      onKeyUp = (): void => {},
      onKeyPress = (): void => {},
      inputMode,
      pattern,
      maxLength,
      autoComplete,
      className,
      label,
      note
    }: TextInputPropsType,
    outerRef,
  ): JSX.Element => {
    const uiState = getUIState({ isDisabled, isReadOnly, hasError });
    // The input element rendered by this component. We use `useState` instead of
    // `useRef` because callback refs allow us to add more than one `ref` to a DOM node.
    const [, setInputEl] = useState<HTMLInputElement | null>(null);

    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={classNames({
          [styles.textInputStateDefault]: uiState === 'default',
          [styles.textInputStateReadonly]: uiState === 'readonly',
          [styles.textInputStateDisabled]: uiState === 'disabled',
          [styles.textInputStateError]: uiState === 'error',
        }, className)}
      >
        {
          label && (
            <Label {...{ hasError, isDisabled }} className="mb-1">{ label }</Label>
          )
        }
        <div className={styles.inputContainer}>
          {
            iconLeft && (
              <div>
                <div
                  className={classNames({
                    [styles.icon]: true,
                    [styles.iconPositionLeft]: true
                  })}
                >
                  { iconLeft }
                </div>
              </div>
            )
          }

          <input
            className={classNames({
              [styles.input]: true,
              [styles.inputSizeSmall]: size === 'small',
              [styles.inputSizeLarge]: size === 'large',
              [styles.inputWithIconLeft]: iconLeft,
            })}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            placeholder={placeholder}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            name={name}
            type={type}
            value={value}
            onChange={(e): void => onChange(e.target.value, e)}
            onClick={(e): void => onClick(e)}
            onFocus={(e): void => onFocus(e)}
            onBlur={(e): void => onBlur(e)}
            onKeyDown={(e): void => onKeyDown(e)}
            onKeyUp={(e): void => onKeyUp(e)}
            onKeyPress={(e): void => onKeyPress(e)}
            id={id}
            ref={(el): void => {
              setInputEl(el);

              // `outerRef` is the potential forwarded `ref` passed in from a consumer.
              // Not all refs are callable functions, so only try and call it if it is.
              if (typeof outerRef === 'function') {
                outerRef(el);
              }
            }}
            inputMode={inputMode}
            pattern={pattern}
            maxLength={maxLength}
            autoComplete={autoComplete}
          />

          <div className={styles.inputStyles}/>
        </div>
        {
          note && (
            <InputNote className="mt-1" hasError={hasError}>{ note }</InputNote>
          )
        }
      </div>
    );
  },
);
TextInput.displayName = 'TextInput';

export default TextInput;

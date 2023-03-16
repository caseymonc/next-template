import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'submit' | 'button';
  label?: string;
  color?: 'primary' | 'secondary';
};

export default function Grid({
  type = 'button',
  label = 'button',
  color = 'primary',
  children,
  ...props
}: Props): JSX.Element {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      {...props}
      aria-label={label}
      title={label}
      className={styles[color]}
    >
      {children}
    </button>
  );
}

import { cva } from 'class-variance-authority';
import { cloneElement, isValidElement } from 'react';

import type { ComponentProps, ReactElement } from 'react';

import styles from './button.module.css';

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

type Props = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  asChild?: boolean;
};

export const Button = ({ variant, size, className, asChild, children, ...props }: Props) => {
  const buttonClassName = buttonVariants({ variant, size, className });

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    const mergedClassName = child.props.className
      ? `${buttonClassName} ${child.props.className}`
      : buttonClassName;

    return cloneElement(child, {
      ...child.props,
      ...props,
      className: mergedClassName,
    });
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

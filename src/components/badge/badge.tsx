import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './badge.module.css';

const badgeVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

type Props = ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof badgeVariants> & {
    children: React.ReactNode;
  };

export const Badge = ({ variant, size, className, children, ...props }: Props) => (
  <span className={badgeVariants({ variant, size, className })} {...props}>
    {children}
  </span>
);

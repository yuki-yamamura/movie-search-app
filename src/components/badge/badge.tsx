import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './badge.module.css';

const badgeVariants = cva(styles.base, {
  variants: {
    color: {
      red: styles.red,
      orange: styles.orange,
      cyan: styles.cyan,
      green: styles.green,
      gray: styles.gray,
      purple: styles.purple,
      blue: styles.blue,
      dark: styles.dark,
      violet: styles.violet,
      pink: styles.pink,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'medium',
  },
});

type Props = Omit<ComponentPropsWithoutRef<'span'>, 'className'> &
  VariantProps<typeof badgeVariants> & {
    children: React.ReactNode;
  };

export const Badge = ({ color, size, children, ...props }: Props) => (
  <span className={badgeVariants({ color, size })} {...props}>
    {children}
  </span>
);

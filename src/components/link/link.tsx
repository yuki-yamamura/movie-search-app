import NextLink from 'next/link';

import type { ComponentProps } from 'react';

import styles from './link.module.css';

type Props = Omit<ComponentProps<typeof NextLink>, 'className'>;

export const Link = (props: Props) => <NextLink className={styles.base} {...props} />;

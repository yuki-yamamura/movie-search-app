'use client';

import { SWRConfig } from 'swr';

import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof SWRConfig>;

export const SWRProvider = (props: Props) => (
  <SWRConfig
    value={{
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }}
    {...props}
  />
);

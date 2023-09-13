'use client';

import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';

import '../middlewares/axios.middleware';

import '@fontsource/roboto/400.css';
import { MasterPage } from '@/components/Shared';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient && 
  <MasterPage>    
    <Component {...pageProps} />
  </MasterPage>
}

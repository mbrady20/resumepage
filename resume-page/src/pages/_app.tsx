// pages/_app.js
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import RootLayout from './layout';
import type { AppProps, AppType } from 'next/app';

import { RecoilRoot } from 'recoil';

const MyApp: AppType = ({Component, pageProps, ...appProps}: AppProps) => {

  const getContent = () => {
    if([`/petQuizData`, `/sign-in`, `/sign-up`].includes(appProps.router.pathname))
      return <Component {...pageProps}/>;

      return(
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      );
  }
  return (
  
      <RecoilRoot>
    <ChakraProvider>
      {getContent()}
    </ChakraProvider>
    </RecoilRoot>
 
  )
}

export default MyApp;
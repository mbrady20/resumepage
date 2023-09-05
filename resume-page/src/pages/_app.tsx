// pages/_app.js
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import RootLayout from './layout';
import type { AppProps, AppType } from 'next/app';

import { RecoilRoot } from 'recoil';
import DataLayout from './layout-data';

const MyApp: AppType = ({Component, pageProps, ...appProps}: AppProps) => {

  const getContent = () => {
    if([`/barChartPage`, `/recentResultsPage`, `/pieChartPage`, `/createAPetPage`].includes(appProps.router.pathname))
      return <DataLayout><Component {...pageProps}/></DataLayout>;

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
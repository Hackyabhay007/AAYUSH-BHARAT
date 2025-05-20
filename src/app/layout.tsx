import { Toaster } from 'react-hot-toast'
import './styles/globals.css'
import ProviderWrapper from '@/store/ProviderWrapper';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
           {/* <Provider store={store}> */}
        {/* <div> <Toaster position="top-center" /></div> */}
          {/* {children} */}
        {/* </Provider> */}

         <ProviderWrapper>
           <div> <Toaster position="top-center" /></div>
          {children}</ProviderWrapper>
        </body>
    </html>
  )
}

import { Toaster } from 'react-hot-toast'
import './styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
        <div> <Toaster position="top-center" /></div>
        {children}</body>
    </html>
  )
}

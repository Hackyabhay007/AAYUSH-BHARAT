import Navbar from '@/app/components/Navbar'
import React from 'react'
import Footer from '@/app/components/Footer'
import PageContent from './PageContent'
import JsonLd from '@/components/JsonLd'
import { blogSchema } from './schema'
import { metadata } from './metadata'

export { metadata }

function Page() {
const scrolled=true;
  return (
   <> 
      <JsonLd data={blogSchema} />
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>
        <Navbar scrolled={true} />
      </div>
      <PageContent/>
      <Footer/>
    </>
  )
}

export default Page
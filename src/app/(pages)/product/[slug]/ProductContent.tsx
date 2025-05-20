
import React from 'react'
import FAQ from './components/FAQ'
// import ProductInsights from './components/ProductInsights'
import NatureIngredients from './components/Naturalingredients'
import HeroSection from './components/HeroSection'
// import VideoScrollSection from './components/VideoScrollSectoin'
import FixedBottomCart from './components/FixedBottomCart'
import SectionFive from '@/app/components/SectionFive'
import TextSlider from '@/app/components/TextSlider'

function ProductContent() {
  return (
    <>
    <HeroSection/>
    {/* <VideoScrollSection/> */}
<TextSlider/>
    <NatureIngredients/>
    {/* <ProductInsights/> */}
    <SectionFive/>

    <FAQ/>
    <FixedBottomCart/>
    </>
  )
}

export default ProductContent
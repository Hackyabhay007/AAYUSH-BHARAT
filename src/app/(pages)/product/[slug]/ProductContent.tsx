
import React from 'react'
// import FAQ from './components/FAQ'
import NatureIngredients from './components/Naturalingredients'
import HeroSection from './components/HeroSection'
import FixedBottomCart from './components/FixedBottomCart'
import SectionFive from '@/app/components/SectionFive'
import TextSlider from '@/app/components/TextSlider'

function ProductContent() {
  return (
    <>
    <HeroSection/>
    
<TextSlider/>
    <NatureIngredients/>
    {/* <ProductInsights/> */}
    <SectionFive/>

    {/* <FAQ/> */}
    <FixedBottomCart/>
    </>
  )
}

export default ProductContent
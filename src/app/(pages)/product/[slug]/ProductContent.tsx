
import React from 'react'
import FAQ from './components/FAQ'
import ProductInsights from './components/ProductInsights'
import ProductCardSection from './components/ProductCardSelection'
import NatureIngredients from './components/Naturalingredients'
import HeroSection from './components/HeroSection'
import VideoScrollSection from './components/VideoScrollSectoin'
import FixedBottomCart from './components/FixedBottomCart'

function ProductContent() {
  return (
    <>
    <HeroSection/>
    <VideoScrollSection/>

    <NatureIngredients/>
    <ProductInsights/>
    <ProductCardSection/>
    <FAQ/>
    <FixedBottomCart/>
    </>
  )
}

export default ProductContent
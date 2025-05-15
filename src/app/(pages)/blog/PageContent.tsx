import React from 'react'
import Hero from './components/Hero'
import BannerSlider from './components/BannerSlider'
import WelcomeMessage from './components/WelcomeMessage'

function PageContent() {
  return (
    <div>
        <BannerSlider/>
        <WelcomeMessage/>
        {/* <FeaturedArticles/> */}
        <Hero/>
    </div>
  )
}

export default PageContent  
import Faq from '@/components/FAQ/FAQ'
import Features from '@/components/Features/Features'
import Hero from '@/components/Hero/Hero'
import Prizes from '@/components/Prizes/Prizes'

import Schedule from '@/components/Schedule/Schedule'
import Sponsors from '@/components/Sponsors/Sponsors'

import React from 'react'

const page = () => {
  return (
    <>
    <Hero />
    <Schedule />
    <Features />
    <Prizes />
    {/* <PrizesFinal /> */}
    <Sponsors/>
    <Faq/>
    </>
  )
}

export default page

import CommunityPartners from '@/components/CommunityPartners/CommunityPartners'
import Faq from '@/components/FAQ/FAQ'
import Features from '@/components/Features/Features'
import Hero from '@/components/Hero/Hero'
import PrizesFinal from '@/components/Prizes/PrizesFinal'
import Schedule from '@/components/Schedule/Schedule'
import Sponsors from '@/components/Sponsors/Sponsors'
import Tracks from '@/components/Tracks/Tracks'
import UpcomingEvent from '@/components/Events/UpcomingEvent'

import React from 'react'

const page = () => {
  return (
    <>
    <Hero />
    <UpcomingEvent />
    <Schedule />
    <Tracks />
    <Features />
    <PrizesFinal /> 
    <Sponsors/>
    <CommunityPartners/>
    <Faq/>
    </>
  )
}

export default page

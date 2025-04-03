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
      <section id="hero">
        <Hero />
      </section>
      <section id="upcoming-event">
        <UpcomingEvent />
      </section>
      <section id="schedule">
        <Schedule />
      </section>
      <section id="tracks">
        <Tracks />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="prizes">
        <PrizesFinal /> 
      </section>
      <section id="sponsors">
        <Sponsors />
      </section>
      <section id="community-partners">
        <CommunityPartners />
      </section>
      <section id="faq">
        <Faq />
      </section>
      
    </>
  )
}

export default page

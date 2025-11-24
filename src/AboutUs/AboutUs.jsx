import React from 'react'
import Layout from '../Layout/Layout'
import Banner from './pages/Banner'
import AboutDoctor from './pages/AboutDoctor'
import Legacy from './pages/Legacy'
import ExperienceTheDifference from './pages/ExperienceTheDIfference'
import KeyTeamMembers from './pages/KeyTeamMembers'
import Milestones from './pages/Milestones'
import SocialResponsibility from './pages/SocialResponsobility'
import GuaranteeStatement from './pages/GuarranteeStatement'

const AboutUs = () => {
  return (
    <Layout>
      <Banner />
      <AboutDoctor />
      <Legacy />
      <ExperienceTheDifference />
      <KeyTeamMembers />
      <Milestones />
      <SocialResponsibility />
      <GuaranteeStatement />
    </Layout>
  )
}

export default AboutUs
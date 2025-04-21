import React from 'react'
import Navbar from './Navbar'
import ImageCarousel from './ImageCarousel'
import Page2 from './Page2'
import Page3 from './Page3'
import FeedbackCarousel from './FeedbackCarousel'
import TeacherIntro from './TeacherIntro'
import Footer from './Footer'
import AnnouncementPopup from './AnnoucementPopup'

function Home({mediaData}) {
  return (
    <div className='overflow-x-hidden'>
      <AnnouncementPopup />
      <Navbar />
      <ImageCarousel banner={mediaData} />
      <Page2 />
      <Page3 />
      <FeedbackCarousel />
      <TeacherIntro />
      <Footer />
    </div>
  )
}

export default Home
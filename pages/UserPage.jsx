import { Box, Typography } from '@mui/material'
import React from 'react'
import UserUi from '../components/UserUi'

import Intro from '.././assets/images/bg.jpg'
import AddBlog from '../components/AddBlog'
import HeroBanner from '../components/HeroBanner'
import HeroComponent from '../components/HeroComponent'

function UserPage() {

  return (
    <Box>
      <img className='background-img' src={Intro} alt="bg" />
      
      <HeroComponent />
      <HeroBanner />
      {/* <AddBlog/> */}

    </Box>
  )
}

export default UserPage

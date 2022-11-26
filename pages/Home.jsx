import { Box } from '@mui/system'
import React, { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import HeroComponent from '../components/HeroComponent'

function Home() {
  const[isMyBlog,setIsMyBlog]=useState(false)
  return (
    <Box>
      <HeroComponent/>
      <HeroBanner isMyBlog={isMyBlog}/>
    </Box>
  )
}

export default Home
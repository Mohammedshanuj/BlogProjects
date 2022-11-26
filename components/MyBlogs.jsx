import { Box } from '@mui/material'
import React, { useState } from 'react'
import HeroBanner from './HeroBanner'

function MyBlogs() {
    const[isMyBlog,setIsMyBlog]=useState(true)
  return (
   <Box>
    <HeroBanner  isMyBlog={isMyBlog} setIsMyBlog={setIsMyBlog} />
   </Box>
  )
}

export default MyBlogs

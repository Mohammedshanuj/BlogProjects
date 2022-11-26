import { Box } from '@mui/material'
import React, { useRef, useState } from 'react'
import CreateBlog from '../components/CreateBlog'

//import ViewBlog from '../components/ViewBlog'

function BlogPage() {
  



    const [isEdit, setIsEdit] = useState(false)
   
    return (
        <Box
        >
            <CreateBlog isEdit={isEdit} />
            {/* <ViewBlog title={titleRef.current.value}/> */}
            
        </Box>
    )
}

export default BlogPage

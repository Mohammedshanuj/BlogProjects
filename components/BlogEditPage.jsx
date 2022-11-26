import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Intro from '.././assets/images/bg.jpg'
import CreateBlog from './CreateBlog'

function BlogEditPage() {
  window.scrollTo({top:'0',behavior:'smooth'})
    const {id}=useParams()
    const [edit, setEdit] = useState([])
    const [isEdit, setIsEdit] = useState(true)
    

    useEffect(() => {

        const takeBlogDetail = async () => {
            const res = await axios.get(`http://localhost:3001/api/v1/blog/content/${id}`)
            setEdit(res.data.content)


        }

        takeBlogDetail()
    }, [id])


  return (
   <Box>
     {/* <img className='background-img' src={Intro} alt="bg" /> */}
     <CreateBlog  edit={edit} id={id} isEdit  />
   </Box>
  )
}

export default BlogEditPage

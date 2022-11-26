import { Box, Button, Stack, Typography } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Intro from '.././assets/images/bg.jpg'
import Ima from '../assets/icons/girl.jpg'


function DetailedBlogPage() {
    const {id}= useParams()
    const nav=useNavigate()
    const [content, setContent] = useState([])
    console.log(id);
    const editBlogHandler=async()=>{
        nav(`/edit/${id}`)

    }


    useEffect(() => {

        const takeBlogDetail = async () => {
            const res = await axios.get(`http://localhost:3001/api/v1/blog/content/${id}`)
            setContent(res.data.content)


        }

        takeBlogDetail()
    }, [id])


    return (
        <Box>
            <img className='background-img' src={Intro} alt="bg" />
            <Box
                zIndex='-1'
                sx={{
                    mt: { lg: '0px', xs: '80px' },
                    ml: { sm: '50px' },
                    mb: { xs: '250px' },
                    // border:'1px dotted white',
                    height: '400px',


                    //backgroundColor:"#52524e"
                }}
                className='scale'
                position="relative"
                p="20px"

            >


                <Box
                    bgcolor='white'
                    mt={2}
                    border='1px white solid'
                    p='10px'

                    height='fit-content'>
                    <Stack display='flex'
                        flexDirection='row'
                    >
                        <img style={{ width: '240px', height: '300px' }} src={content.blogImageURL ? content.blogImageURL : Ima} alt="image" />
                        <Stack alignItems='center' >

                            <Typography variant={content.variant} sx={{ ml: '40px', fontStyle: content.italic ? 'italic' : 'normal', fontWeight: content.bold ? 'bold' : 'normal' }}>{content.title ? content.title : 'Title'}</Typography>

                            {/* <Typography variant='h6' width='500px' height='300px' sx={{  ml: '50px', mt: '20px', wordBreak: 'break-all' }}>{value}</Typography> */}
                            <MDEditor.Markdown source={content.description ? content.description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} style={{ whiteSpace: 'pre-wrap', minWidth: '500px', minHeight: '250px', marginTop: '30px', marginLeft: '20px' }} />

                        </Stack>

                    </Stack>
                    <Button variant='contained' sx={{ mb: '10px' }}
                                    onClick={(e) => editBlogHandler()}
                                >Edit</Button>
                </Box >
            </Box>
        </Box>
    )
}

export default DetailedBlogPage

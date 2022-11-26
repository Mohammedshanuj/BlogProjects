import { Box, Typography, Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Intro from '../assets/images/bg.jpg'
import Hero from '../assets/images/heroo.png'
import axios from 'axios'
import Ima from '../assets/icons/girl.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { brown } from '@mui/material/colors'
import MDEditor from '@uiw/react-md-editor'
import { useSelector } from 'react-redux'
import { config } from '../utils/axiosData'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import BlogEditPage from './BlogEditPage'
import CommentIcon from '@mui/icons-material/Comment';

function HeroBanner({ isMyBlog, setIsMyBlog }) {

    const { token } = useSelector(state => state.loggedIn)
    const { isLogin } = useSelector(state => state.loggedIn)
    const [content, setContent] = useState({})
    const [res, setRes] = useState({})
    const [contents, setContents] = useState([])
    const [like, setLike] = useState(false)
    const [count, setCount] = useState(0)
    const handleLike = async (id, lik) => {

        // console.log(id);

        setLike(!like)

        const data = {
            like: !lik,
            id: id
        }
        try {
            const res = await axios.post("http://localhost:3001/api/v1/blog/like", data, config)
            // console.log(res.data);
            setCount(res.data.c)
        } catch (e) {
            // console.log(e);
        }

    }
    useEffect(() => {

        const responseTake = async () => {
            try {
                const res = isMyBlog ? await axios.post('http://localhost:3001/api/v1/blog/myBlogs', { token }, config) : await axios.get('http://localhost:3001/api/v1/blog/isActive')

                // console.log(res.data.content[0].content);
                // setRes(res.data.content[0])
                setContents(res.data.contentData);
                //  console.log(res.data.content[0]);
                // setContent(res.data.content[0].content)



            } catch (err) {
                console.log(err);
            }
        }
        responseTake()
    }, [res,like])

    const dateNow = new Date()
    const msNow = dateNow.getTime()

    const nav = useNavigate()
    const editBlogHandler = (id) => {
        nav(`/edit/${id}`)
    }

    //console.log(like);
    return (
        <div style={{ zIndex: '-1' }}>
            <img className='background-img' src={Intro} alt="bg" />
            <Box sx={{ mt: { lg: '100px', xs: '80px' } }} >
                {contents.map((cont) => {
                    // let msNow=dateNow.getTime()
                    //console.log(cont.content.title);
                    // if(cont.startTS < msNow && cont.endTS > msNow){
                    //console.log("testing");
                    return (
                        <Box
                            sx={{
                                bgcolor: 'white',
                                mb: { xs: '250px', lg: '100px' },
                                minHeight:'400px'
                            }}

                        >

                            <NavLink className='decoration' to={`/details/${cont._id}`}>
                                <Box
                                    // zIndex='-1'
                                    sx={{
                                        mt: { lg: '0px', xs: '80px' },
                                        ml: { sm: '50px' },
                                        mb: { xs: '250px', lg: '0px' },
                                        // border:'1px dotted white',
                                        height: '300px',


                                        //backgroundColor:"#52524e"
                                    }}
                                    className=''
                                    position="relative"
                                // p="20px"

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
                                            <img style={{ width: '240px', height: '300px' }} src={cont.blogImageURL ? cont.blogImageURL : Ima} alt="image" />
                                            <Stack alignItems='center' >

                                                <Typography variant={cont.variant} sx={{ ml: '40px', fontStyle: cont.italic ? 'italic' : 'normal', fontWeight: cont.bold ? 'bold' : 'normal' }}>{cont.title ? cont.title : 'Title'}</Typography>

                                                {/* <Typography variant='h6' width='500px' height='300px' sx={{  ml: '50px', mt: '20px', wordBreak: 'break-all' }}>{value}</Typography> */}
                                                <MDEditor.Markdown
                                                    source={cont.description ? cont.description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                                                    style={{ overflow: 'hidden', whiteSpace: 'pre-wrap', minWidth: '500px', maxHeight: '150px', marginTop: '30px', marginLeft: '20px' }} />

                                            </Stack>

                                        </Stack>




                                    </Box >








                                </Box>

                            </NavLink>

                            <Stack direction='row' gap='20px' sx={{ marginLeft: '1250px', position: 'relative' }}>
                                {isLogin ?
                                    <>
                                        <CommentIcon sx={{ cursor: 'pointer' }} />

                                        <Stack direction='row'>
                                            {cont.like ? <FavoriteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={(e) => handleLike(cont._id, cont.like)} /> : <FavoriteBorderIcon
                                                sx={{ color: 'red', cursor: 'pointer' }}

                                                onClick={(e) => handleLike(cont._id, cont.like)}
                                            ></FavoriteBorderIcon>}
                                            <input disabled name="" id="" style={{ backgroundColor: 'transparent', width: '30px', height: '40px', border: 'none', paddingBottom: '15px' }} value={cont.count} />
                                        </Stack> </> : ''}



                                {isMyBlog ? <Button variant='contained' sx={{ mb: '10px' }}
                                    onClick={(e) => editBlogHandler(cont._id)}
                                >Edit</Button> : ''}
                            </Stack>

                        </Box>



                    )
                })}
            </Box>


        </div >
    )
}

export default HeroBanner
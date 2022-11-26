import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { config } from '../utils/axiosData';
import axios from 'axios';

function BlogForm() {

    // window.scrollTo({ top: 1800, left: 0, behavior: 'smooth' });
    const titleRef = React.useRef('')
    const quoteRef = React.useRef('')
    const descRef = React.useRef('')
    const detailRef = React.useRef('')
    const startRef = React.useRef(Date)
    const endRef = React.useRef(Date)

    const handleAddBlog = async (event) => {
        event.preventDefault();
        const data = {
            startDate: startRef.current.value,
            endDate: endRef.current.value,
            content: {
                title: titleRef.current.value,
                quotes: quoteRef.current.value,
                desc: descRef.current.value,
                details: detailRef.current.value
            }
        }
        try {
            const res = await axios.post("http://localhost:3001/api/v1/blog/content", data, config)
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    return (

        <Stack component="form" noValidate onSubmit={handleAddBlog} sx={{ mt: 2 }}>
             <Grid container spacing={1}>

             <Grid item xs={12} sm={6} >
            <TextField
                required
                fullWidth
                name="start"
                label="start-post"
                type="date"
                id=""
                autoComplete=""
                inputRef={startRef}



            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
               
                required
                fullWidth
                
                label="end-post"
                type="date"
                id="date"
                autoComplete=""
                inputRef={endRef}



            />
            </Grid>
            </Grid>
                            
            <TextField

                margin="normal"
                required
                autoComplete='none'
                fullWidth
                id="title"
                inputRef={titleRef}
                label="Enter Title"
                name="title"
                autoFocus
            />
            <TextField

                margin="normal"
                required
                autoComplete='none'
                fullWidth
                id="quote"
                inputRef={quoteRef}
                label="Enter quote"
                name="quote"
                autoFocus
            />
            <TextField

                margin="normal"
                required
                autoComplete='none'
                fullWidth
                id="desc"
                inputRef={descRef}
                label="Enter desc"
                name="desc"
                autoFocus
            />
            <TextField
                id="outlined-multiline-static"
                label="explain detaily"
                multiline
                inputRef={detailRef}
                rows={4}

            />
            <br />
           

            
            <br />
            <Button type='submit' variant="contained" endIcon={<SendIcon />}>
                POST
            </Button>
            
        </Stack>

    )
}

export default BlogForm




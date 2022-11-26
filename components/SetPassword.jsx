import { Stack, Typography, TextField, Box, Button, Container } from '@mui/material'
import React, { useRef,useContext,createContext } from 'react'
import Intro from '../assets/videos/v3.mp4'
import { config } from '../utils/axiosData'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { TokenContext } from './ForgotPwd'
import { useSelector } from 'react-redux'

function SetPassword() {
   
    const passRef=useRef('')
    const cpassRef=useRef('')
    const nav=useNavigate()
   // const {token}=useSelector(state=>state.passtoken)
   const token =useParams()
   console.log(token.token);
    const setPwdHandler=async(event)=>{
        event.preventDefault();
        try {
            const data={
                password:passRef.current.value,
                confirmPassword:cpassRef.current.value,
                token:token.token
            }
           
            console.log(token);
            const res = axios.post(`http://localhost:3001/api/v1/user/setPassword`, data, config)
            alert("password reset succesfully Login Now😉")
            nav('/login')
        } catch (e) {
            console.log(e);
            alert('try again')
        }
    }
  return (
    <div>
    <video src={Intro} id='background-video' autoPlay loop muted ></video>
    <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',

                alignItems: 'center',
                backgroundColor: 'white' 
            }}

            width='300px'
            height='400px'

        >
            <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
                <Typography variant='h4'>Password Reset</Typography>
                <br /><br />
                <Typography sx={{ fontWeight: '500' }}>Enter your email address and we'll send you an email with instructions to reset your password.</Typography>
                <br />
                <TextField
                    //sx={{ input: { color: 'white' } }}
                    margin="normal"
                    required
                    autoComplete='none'
                    fullWidth
                    id="new-password"
                    inputRef={passRef}
                    label="New Password"
                    type='password'
                    name="newPassword"
                    autoFocus
                />
                
                <TextField
                   // sx={{ input: { color: 'white' } }}
                    margin="normal"
                    required
                    autoComplete='none'
                    type='password'
                    fullWidth
                    id="conf-password"
                    inputRef={cpassRef}
                    label="enter confirm password"
                    name="confirmPassword"
                    
                />

                <Button onClick={setPwdHandler} variant='contained'>SET NEW PASSWORD</Button>
                <Box>

                </Box>
            </Stack>
        </Box>
    </Container>

</div>
  )
}

export default SetPassword

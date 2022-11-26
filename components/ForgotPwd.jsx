import { Stack, Typography, TextField, Box, Button, Container } from '@mui/material'
import React, { useRef, useContext, createContext, useState } from 'react'
import Intro from '../assets/videos/v3.mp4'
import { config } from '../utils/axiosData'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SetPassword from './SetPassword'
import { useDispatch } from 'react-redux'
import { setTokens } from '../redux/slice/passSlicer'


export const TokenContext = createContext()

function ForgotPwd() {
    const dispatch=useDispatch()
    const emailRef = useRef('')
    const navigate = useNavigate()
    const fgtPwdHandler = async (event) => {
        event.preventDefault();
        try {
            const data = {
                email: emailRef.current.value
            }
            const res = axios.post('http://localhost:3001/api/v1/user/forgotPassword', data, config)


            alert("your reset password link send to you email verify and login here💕")
        //     const tmp1 = await res
        //     console.log(res);
        //     console.log(tmp1);
        //    const token=tmp1.data.verifyToken
         //  dispatch(setTokens({token:token}))
            navigate('/login')
        } catch (e) {
            console.log(e);
            alert('invalid email')
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
                        backgroundColor:'white',
                        alignItems: 'center',
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

                            margin="normal"
                            required
                            autoComplete='none'
                            fullWidth
                            id="email"
                            inputRef={emailRef}
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <br /><br />

                        <Button onClick={fgtPwdHandler} variant='contained'>RESET PASSWORD</Button>
                        <Box>

                        </Box>
                    </Stack>
                </Box>
            </Container>

        </div>
    )
}

export default ForgotPwd

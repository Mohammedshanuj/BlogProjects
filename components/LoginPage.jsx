import React, { useState, useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Home from '../pages/Home';
import axios from 'axios'
import { Alert, FilledInput, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { Stack } from '@mui/system';
import { UTurnLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import Intro from '../assets/images/bg.jpg'
import { config } from '../utils/axiosData';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slice/authSlice';
import styled from '@emotion/styled';


const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    color:'white',
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'white',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    // borderColor: 'white',
    color:'white',
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
  color: 'white',
  '& label': {
    color: 'white'
  },
  "& .MuiFormHelperText-root": {
    color: 'red!important',
    fontWeight: 800
  },
  

});




function Copyright(props) {
  return (
    <Typography sx={{}} variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mohammedshanuj.github.io/webpage/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function LoginPage() {
  const navigate = useNavigate()
  const[message,setMessage]=useState('')
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const emailRef = useRef('')
  const passRef = useRef(null)
  // const [succesState, setSuccessState] = useState(false)
  // const [errorState, setErrorState] = useState(false)
  // // const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch()


  // useEffect(() => {
  //   if(isLogin){
  //       //<NavLink></NavLink>
  //       dispatch(setCredentials({user:}))
  //       navigate('user')
  //   }
  // }, [isLogin])
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passRef.current.value
    }
    try {
      const res = await axios.post('http://localhost:3001/api/v1/user/login', data, config)
      console.log(res);
      dispatch(setCredentials({ tokeni: res.data.token, useri: res.data.user }))
     
      // (<Alert severity="success">{res.data.message}!</Alert>)
      setMessage(res.data.message)
       
      let uT = res.data.user.userType
      if (uT == 'ADMIN') {
        navigate('/admin')
      } else if (uT == 'PREMIUM') {
        navigate('/premium')
      } else if (uT == 'NORMAL') {
        navigate('/user')
      } else if (uT == 'GUEST') {
        navigate('/guest')
      }

    } catch (error) {
      console.log(error);

      alert("Incorrect password or email")
    }
    event.target.reset()
  }
  //console.log(succesState, errorState);
  const forgotpwdHandler = () => {

  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //    setInputData({email:event.target.email.value,password:event.target.password.value})
  //   //  event.target.reset()
  //    if(inputData.email=='muhammedshanuj@gmail.com'){
  //    <Home/>}



  // console.log({
  //   email: data.get('email'),
  //   password: data.get('password'),
  // });



  // };
  // console.log('form check');
  // console.log(inputData);

  return (
    <div>
      <img className='background-img' src={Intro} alt="bg" />
      <Container component="main" maxWidth="xs">
      

        {/* <CssBaseline/> */}
        {/* {succesState &&
          <Snackbar open={true} autoHideDuration={6000} >
            <div>Succesfully Login</div>
          </Snackbar>} */}


        {/* {errorState &&
          <Snackbar open={true} autoHideDuration={6000} >
            <div>incorrect email or PASSWORD</div>
          </Snackbar>} */}

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ color: 'white', fontWeight: 900 }} component="h1" variant="h4">
            Sign in
          </Typography>
          <Box component="form" autoComplete='none' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <ValidationTextField
              sx={{ input: { color: 'white' } }}
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

            <ValidationTextField
              sx={{ input: { color: 'white' } }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              inputRef={passRef}
              type="password"
              autoComplete="none"
              id="password"
            />
            <FormControlLabel
            sx={{color:'black'}}
              control={<Checkbox value="remember"  color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink sx={{ cursor: 'pointer' }} to='/forgotPassword' variant="body2">
                  Forgot password?
                </NavLink>

              </Grid>
              <Grid item>
                <NavLink to='/register'  >
                  Don't have an account? Sign Up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}

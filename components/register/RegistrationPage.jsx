import React, { useState, useReducer, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { FormLabel, Radio, RadioGroup, Stack } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import axios from 'axios'
import { Children } from 'react';
import Intro from '../../assets/videos/v3.mp4'
//import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { axiosData, config } from '../../utils/axiosData';

//import FormData from 'form-data'
const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
    },
    '& input:invalid + fieldset': {
        borderColor: 'white',
        borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
    },
    color: 'white',
    '& label': {
        color: 'white'
    },
    "& .MuiFormHelperText-root": {
        color: 'red!important'
    }

});




//const theme = createTheme();

export default function RegistrationPage() {
    // const [radio, setRadio] = useState("")
    const [handleButton, setHandleButton] = useState(true)

    const navigate = useNavigate()


    const [inputData, setInputData] = React.useState({
        firstName: "",
        lastName: '',
        password: "",
        confirmPassword: "",
        email: "",
        errorEmail: "",
        errorPhone: "",
        errorPassword: "",
        errorCPassword: "",
        dob: Date,
        gender: ""
    });
    // It is the state that you want to manage for your component
    const initialState = {
        firstName: "",
        lastName: '',
        password: "",
        confirmPassword: "",
        email: "",
        errorEmail: "email required",
        errorName: "last name required",
        errorPassword: "password required",
        errorCPassword: "password required"
    };

    // reducer
    // reducer is a function, which will take (state, action) as parameters and returns newstate
    // reducer is the place, where we will update our state and return new state
    // action is the object which will get type and payload (value)
    // to trigger an action, we will be using dispatch
    const reducer = (prevState, action) => {
        switch (action.type) {
            case "FN": {
                return {
                    ...prevState,
                    firstName: action.value,

                };
            }
            case "PWD": {
                return {
                    ...prevState,
                    password: action.value,
                    errorPassword: action.value == "" ? 'password required' : (action.value.length < 8) ? "Enter min 8 char for strong password" : (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/).test(action.value)) ? "Add at least one special char ,capital,number" : ''
                };
            }
            case "CPWD": {
                return {
                    ...prevState,
                    confirmPassword: action.value,
                    errorCPassword: action.value == "" ? 'password required' : (action.value.length < 8) ? "Enter min 8 char for strong password" : (prevState.password !== action.value) ? "password doesnot match" : ""
                };
            }

            case "EMAIL": {
                return {
                    ...prevState,
                    email: action.value,
                    errorEmail: action.value == "" ? 'email required' : (!new RegExp(/\S+@\S+\.\S+/).test(action.value)) ? "incorrect format" : ""




                };
            }
            case "LN": {
                return {
                    ...prevState,
                    lastName: action.value,
                    errorName: action.value == "" ? 'lastName required' : (!new RegExp(/^[a-z ,.'-]+$/).test(action.value)) ? "pls enter valid name" : ""
                };
            }
            case "DOB": {
                return {
                    ...prevState,
                    dob: action.value
                }
            }
            case "GENDER": {
                return {
                    ...prevState,
                    gender: action.value
                }
            }
            // case "PH": {
            //     return {
            //         ...prevState,
            //         phone: action.value,
            //         errorPhone: action.value == "" ? 'phone number required' : (!new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g).test(action.value)) ? "pls enter valid phone number" : ""
            //     };
            // }
            default:
                return prevState;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const onInputChange = (e, type) => {
        if (e.type === "change") {
            if (type === "fn") {
                // do some thing for firstName
                // e.target.value
                setInputData((prevInputData) => {
                    return {
                        ...prevInputData,
                        firstName: e.target.value,
                    };
                });
                dispatch({
                    type: "FN",
                    value: e.target.value,
                });
            } else if (type === "pwd") {
                // do some thing for passwrod
                setInputData((prevInputData) => {
                    return {
                        ...prevInputData,
                        password: e.target.value,
                    };
                });
                dispatch({
                    type: "PWD",
                    value: e.target.value,
                });
            }

            else if (type === "em") {
                // do some thing for email
                setInputData((prevInputData) => {
                    return {
                        ...prevInputData,
                        email: e.target.value,
                    };
                });
                dispatch({
                    type: "EMAIL",
                    value: e.target.value,
                });
            }
            else if (type === "ln") {
                // do some thing for phone
                setInputData((prevInputData) => {
                    return {
                        ...prevInputData,
                        lastName: e.target.value,
                    };
                });
                dispatch({
                    type: "LN",
                    value: e.target.value,
                });
            }


            else if (type === "cpwd") {
                // do some thing for confirm pass
                setInputData((prevInputData) => {
                    return {
                        ...prevInputData,
                        confirmPassword: e.target.value,
                    };
                });
                dispatch({
                    type: "CPWD",
                    value: e.target.value,
                });
            }
            else if (type === "dob") {
                // do some thing for confirm pass
                setInputData((prevInputData) => {
                    return {
                        ...prevInputData,
                        dob: e.target.value,
                    };
                });
                dispatch({
                    type: "DOB",
                    value: e.target.value,
                });
            }
            else if (type === "gender") {
                // do some thing for confirm pass
                setInputData((prevInputData) => {
                    return {
                        ...prevInputData,
                        gender: e.target.value,
                    };
                });
                dispatch({
                    type: "GENDER",
                    value: e.target.value,
                });
            }
        }
    };


    useEffect(() => {
        if (state.errorEmail == "" && state.errorPassword == "" && state.errorCPassword == "" && state.errorName == "") {
            setHandleButton(false)
        }
        else {
            setHandleButton(true)
        }
    }, [state.errorEmail, state.errorCPassword, state.errorPassword, state.errorName])

    const handleRegistration = async (event) => {
        event.preventDefault();

        const data = {
            userType: 'GUEST',
            name: state.firstName.concat(" ", state.lastName),
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
            dob: state.dob,
            gender: state.gender
        }
        console.log(data);
        try {
            const res = await axios.post('http://localhost:3001/api/v1/user/reg', data, config)
            console.log(res);
            alert("Registered Succesfully ")
            navigate('/login')
        } catch (error) {
            console.log(error);
            alert("Incorrect data")
        }
    };
    return (
        // <ThemeProvider theme={theme}>
        <div>
            <video style={{ opacity: 1 }} src={Intro} id='background-video' autoPlay loop muted ></video>

            <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleRegistration} sx={{ mt: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <ValidationTextField
                                    sx={{ input: { color: 'white' }, color: 'white', borderBlockColor: 'red' }}
                                    label="First Name"
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    variant="outlined"
                                    defaultValue="Success"
                                    id="validation-outlined-input"
                                    fullWidth
                                    value={state.firstName}
                                    onChange={(e) => {
                                        onInputChange(e, "fn");
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ValidationTextField
                                    sx={{ input: { color: 'white' } }}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    helperText={state.errorName}
                                    value={state.lastName}
                                    onChange={(e) => {
                                        onInputChange(e, "ln");
                                    }}

                                />

                            </Grid>
                            <Grid item xs={12}>
                                <ValidationTextField
                                    sx={{ input: { color: 'white' } }}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={state.email}
                                    onChange={(e) => {
                                        onInputChange(e, "em");
                                    }}
                                    helperText={state.errorEmail}

                                />

                            </Grid>
                            <Grid item xs={12}>
                                <ValidationTextField
                                    sx={{ input: { color: 'white' } }}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={state.password}
                                    helperText={state.errorPassword}
                                    onChange={(e) => {
                                        onInputChange(e, "pwd");
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <ValidationTextField
                                    sx={{ input: { color: 'white' } }}
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-confirmPassword"
                                    helperText={state.errorCPassword}
                                    value={state.confirmPassword}

                                    onChange={(e) => {
                                        onInputChange(e, "cpwd");
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <ValidationTextField
                                    sx={{ input: { color: 'white' } }}
                                    required
                                    fullWidth
                                    name="dob"
                                    label=""
                                    type="date"
                                    id="date"
                                    autoComplete="date"
                                    value={state.dob}
                                    onChange={(e) => {
                                        onInputChange(e, "dob");
                                    }}



                                />
                            </Grid>
                            <br /><br />
                            <Grid item xs={12} >
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: 'white' }}>Gender :</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={state.gender}
                                    onChange={(e) => {
                                        onInputChange(e, "gender");
                                    }}
                                >
                                    <FormControlLabel sx={{ color: 'white' }} value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel sx={{ color: 'white' }} value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel sx={{ color: 'white' }} value="other" control={<Radio />} label="Other" />

                                </RadioGroup>


                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    sx={{ color: 'white' }}
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I agree with terms & condition and Privacy Policy."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={handleButton}

                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item sx={{ fontSize: "18px" }}>
                                <NavLink to='/login' variant="body2">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div >
        // </ThemeProvider>

    );
}

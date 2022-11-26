import { alpha, createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Ima from '../assets/icons/girl.jpg'
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios';
import { config } from '../utils/axiosData';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


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


function CreateBlog({ edit, isEdit }) {
    console.log(isEdit);
    const { id } = useParams()
    // const handleBlog = async (event) => {

    //     event.preventDefault()
    // }
    // const [open, setOpen] = React.useState(false);
    // const [varian, setVarian] = React.useState('');
    // const [styl, setStyl] = React.useState('');
    const handleChange = (event) => {
        setVariant(event.target.value || '');
    };
    // const handleChangeStyle = (event) => {
    //     setStyl(event.target.value || '');
    // };

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason !== 'backdropClick') {
    //         setOpen(false);
    //     }
    // };


    // const [datas, setDatas] = useState('')




    // const [txt, setTxt] = useState('')
    // const rteHandler = (event) => {
    //     const plainText = event.getCurrentContent().getPlainText()
    //     const rteContent = convertToRaw(event.getCurrentContent())
    //     setTxt(plainText)
    //     rteContent && setDatas(JSON.stringify(rteContent))
    // }

    // const myTheme = createTheme({
    //     // Set up your custom MUI theme here
    //     background: {
    //         default: '#d41010',
    //     },
    //     text: {
    //         primary: 'rgba(243,232,232,0.87)',
    //     },

    // });
    const [title, setTitle] = useState('')
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [variant, setVariant] = useState('')
    // const [style, setStyle] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const [imageUpload, setImageUpload] = useState({})
    const { token } = useSelector(state => state.loggedIn)
    const fileHandler = async (event) => {

        console.log('uploading image');
        setImageUpload(event.target.files[0])
        setImage(URL.createObjectURL(event.target.files[0]))

    }

    const blogPostHandler = async (e) => {
        e.preventDefault()

    }
    const boldHandler = (e) => {
        e.preventDefault()
        setBold(!bold)

    }
    const italicHandler = (e) => {
        e.preventDefault()
        setItalic(!italic)

    }

    const handleBlog = async (event) => {
        event.preventDefault();
        const datas = new FormData(event.currentTarget);
        const data = {
            // startDate: startRef.current.value,
            // endDate: endRef.current.value, 
            title: title ? title : edit.title,
            variant: variant ? variant : edit.variant,
            bold: bold,
            italic: italic,
            description: description ? description : edit.description,
            image: datas.get('image'),
            token: token
        }
        console.log(data);

        const configg = {
            headers: {

                'Content-Type': `multipart/form-data`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

            }
        };
        try {
            const res = isEdit ? await axios.put(`http://localhost:3001/api/v1/blog/content/${id}`, data, configg) : await axios.post("http://localhost:3001/api/v1/blog/content", data, configg)
            console.log(res);
            alert(res.data.message)
            setTitle('')
            setDescription('')
            setImage('')
            setVariant('')
            

        } catch (e) {
            console.log(e);
        }
        
        event.target.reset()
    }


    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='100px'

        >
            <Box display='flex'
                flexDirection='column'
                top='0'
                minWidth='500px'
                maxWidth='500px'
                left='0'
                height='fit-content'
                component="form"
                noValidate
                onSubmit={handleBlog}
                sx={{ mt: 2 }}
                rowGap={2}
                border='1px solid white'
                p='10px'
            >



                <Typography variant='h4' sx={{ color: 'white', fontWeight: '600' }}>Create Your Own Blog</Typography>
                <Stack display='flex'
                    flexDirection='row'>
                    <IconButton color='primary' onClick={boldHandler}>
                        <FormatBoldIcon />
                    </IconButton><br />
                    <IconButton onClick={italicHandler}>
                        <FormatItalicIcon color='primary' />
                    </IconButton><br /><br />

                    <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: '#1976D2' }}>
                        <InputLabel htmlFor="demo-dialog-native">Variant</InputLabel>
                        <Select
                            native
                            value={variant ? variant : isEdit ? edit.variant : ""}
                            onChange={handleChange}
                            input={<OutlinedInput label="variant" id="demo-dialog-native" />}
                        >
                            <option aria-label="None" value="" />
                            <option value={'h1'}>h1</option>
                            <option value={'h2'}>h2</option>
                            <option value={'h3'}>h3</option>
                            <option value={'h4'}>h4</option>
                            <option value={'h5'}>h5</option>
                            <option value={'h6'}>h6</option>
                        </Select>
                    </FormControl>




                </Stack>
                <ValidationTextField
                    sx={{ input: { color: 'white' }, color: 'white', borderBlockColor: 'red' }}
                    label="Enter Title"
                    autoComplete="title"
                    name="title"
                    required
                    variant="outlined"
                    defaultValue=""
                    id="validation-outlined-input"
                    fullWidth
                    //  inputRef={titleRef}
                    value={title ? title : isEdit ? edit.title : title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* <Button variant='contained' onClick={handleClickOpen}>Customize Title</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select varient and style</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="demo-dialog-native">Variant</InputLabel>
                            <Select
                                native
                                value={varian}
                                onChange={handleChange}
                                input={<OutlinedInput label="variant" id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="" />
                                <option value={'h1'}>h1</option>
                                <option value={'h2'}>h2</option>
                                <option value={'h3'}>h3</option>
                                <option value={'h4'}>h4</option>
                                <option value={'h5'}>h5</option>
                                <option value={'h6'}>h6</option>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-dialog-select-label">Style</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={styl}
                                onChange={handleChangeStyle}
                                input={<OutlinedInput label="Age" />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'italic'}>italic</MenuItem>
                                <MenuItem value={'bold'}>bold</MenuItem>
                                <MenuItem value={'oblique'}>Oblique</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog> */}
                <Box bgcolor='white'

                    border='5px solid white'>
                    {/* <ThemeProvider theme={myTheme}> */}

                    <MDEditor
                        value={description ? description : isEdit ? edit.description : ''}
                        onChange={setDescription}
                        preview='edit'
                    />

                    {/* </ThemeProvider> */}

                </Box>
                <Stack display='flex'
                    flexDirection='row'
                    p='10px'
                    columnGap={5} >

                    <IconButton color="primary" variant="contained" component="label" >
                        Upload
                        <input hidden accept="image/*" name='image' multiple type="file" onChange={fileHandler} />
                        <PhotoCamera />
                    </IconButton>

                    <Avatar variant='square' src={image ? image : isEdit ? edit.blogImageURL : "/broken-image.jpg"} style={{
                        width: '90px', height: '80px'
                    }} />
                </Stack>
                <Stack display='flex'
                    flexDirection='row'
                    p='10px'
                    columnGap={5}>
                    {/* <Button variant='contained' onClick={handleViewBlog}>Check</Button> */}
                    <Button variant="contained" type='submit' endIcon={<SendIcon />}>Submit</Button>
                </Stack>

            </Box >

            <Box
                bgcolor='white'
                mt={2}
                border='1px white solid'
                p='20px'

                height='fit-content'>
                <Stack display='flex'
                    flexDirection='row'
                >
                    <img style={{ width: '240px', height: '300px' }} src={image ? image : isEdit ? edit.blogImageURL : Ima} alt="image" />
                    <Stack alignItems='center' >

                        <Typography variant={variant ? variant : isEdit ? edit.variant : ''} sx={{ ml: '40px', fontStyle: italic ? 'italic' : isEdit ? edit.italic : 'normal', fontWeight: isEdit ? edit.bold : bold ? 'bold' : 'normal' }}>{title ? title : isEdit ? edit.title : 'Title'}</Typography>

                        {/* <Typography variant='h6' width='500px' height='300px' sx={{  ml: '50px', mt: '20px', wordBreak: 'break-all' }}>{value}</Typography> */}
                        <MDEditor.Markdown source={description ? description : isEdit ? edit.description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} style={{ whiteSpace: 'pre-wrap', minWidth: '500px', minHeight: '250px', marginTop: '30px', marginLeft: '20px' }} />

                    </Stack>
                </Stack>
            </Box >
        </Box>

    )
}

export default CreateBlog



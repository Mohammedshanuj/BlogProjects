import React, { useEffect, useState } from 'react'
import { Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import Logo from '../assets/images/speed.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../redux/slice/authSlice'



function Navbar() {
  const[isMyBlog,setIsMyBlog]=useState(false)
  const [pages, setPages] = useState([])
  const [prjName, setPrjName] = useState("")
  const { isLogin } = useSelector(state => state.loggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate
  useEffect(() => {

    const responseTake = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/v1/blog/navbar')
        console.log(res.data.data[0].pages);
        setPrjName(res.data.data[0].projectName)
        setPages(res.data.data[0].pages)

      } catch (err) {
        console.log(err);
      }
    }
    responseTake()
  }, [])
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  console.log('test 999');
  console.log(pages);
  if (isLogin == true) {
    pages[1].name = 'Logout'

    console.log('pages data................');
    console.log(pages);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          sx={{ color: 'white' }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon sx={{ width: '100px', height: '60px' }} />
        </IconButton>
        <Menu

          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}>
          {/* {isLogin ? pages[1].name = "Logout" : 'Login'} */}


          {

            pages.map((page) =>
            (
              <MenuItem sx={{ width: '200px' }} key={page.name} onClick={handleCloseNavMenu}>
                <NavLink to={page.to}
                  style={{
                    fontWeight: '600',
                    textDecoration: 'none',
                    color: '#868d9c',
                    marginBottom: '20px'
                  }}>{page.name}</NavLink>

              </MenuItem>
            )

            )}
        </Menu>
      </Box>
      <Stack

        position='relative'
        marginBottom="50px"
        direction="row"
        justifyContent="space-around"
        sx={{
          gap: { sm: '32px', xs: '20px', md: '112px', lg: '122px', xl: '134px' },
          mt: { sm: '32px', xs: '20px' },
          justifyContent: 'none'
        }}
      //  px='20px'
      >
        <Box
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          fontSize='24px'
          fontWeight='800'
          display='flex'
          flexDirection='row'
          marginLeft='20px'
        >


          {/* {isLogin? pages.push({
      name: 'My Blogs',
      to:'/myBlogs'
    }):''} */}
          {pages?.map((page, index) => (
            <Box key={index} sx={{ marginLeft: '60px' }}>
              {page.name === "Logout" ?
                (
                <><NavLink
                    style={{
                      fontWeight: '1000',
                      textDecoration: 'none',
                      color: 'white',
                      opacity: '1',
                      fontSize: '28px',
                      backgroundColor: 'transparent',
                      // borderBottom: '3px solid #FF2625',
                      marginBottom: '20px'
                    }}
                    onClick={() => {
                      console.log('onclick working')
                      dispatch(logOut())
                      navigate('/login')
                    } }
                  >{page.name}</NavLink><NavLink
                    style={{
                      fontWeight: '1000',
                      textDecoration: 'none',
                      color: 'white',
                      opacity: '1',
                      fontSize: '28px',
                      marginLeft: '60px',
                      backgroundColor: 'transparent',
                      // borderBottom: '3px solid #FF2625',
                      marginBottom: '20px'
                    }}
                   
                    to='/myBlog'>My Blogs</NavLink></>)
                :
                <NavLink
                  style={{
                    fontWeight: '1000',
                    textDecoration: 'none',
                    color: 'white',
                    opacity: '1',
                    fontSize: '28px',
                    backgroundColor: 'transparent',
                    // borderBottom: '3px solid #FF2625',
                    marginBottom: '20px'
                  }}

                  to={page.to}>{page.name}</NavLink>}
            </Box>
          ))}
        </Box>
        <Box
          flexDirection='row'
          display='flex'
          position='absolute'
          sx={{
            right: '10%',
            marginBottom: '20px'
          }}
          gap='20px'
        >
          <img src={Logo} alt="logo" style={{ width: '60px', height: "40px" }} />
          <Typography variant='h4' sx={{ color: 'white', fontWeight: '600' }}>{prjName}</Typography>
        </Box>

      </Stack>
    </>
  )
}

export default Navbar

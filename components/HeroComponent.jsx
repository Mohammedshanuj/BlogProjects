import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'


function HeroComponent() {
    const {user}=useSelector(state=>state.loggedIn)
    return (
        // <div>
        //     <div className="hero-image" style={{height: '100%'}}>
        //         <div className="hero-text">
        //             <h1 >Canada Goose</h1>
        //             <p>spring styles have arrived</p>
        //             <button>SHOP NOW</button>
        //         </div>
        //         <div className="hero-exclusions">
        //             <a href="#popup1">
        //                 <p className="exclusions">*click here for details</p>
        //             </a>
        //         </div>

        //         <div id="popup1" className="overlay">
        //             <div className="popup">
        //                 <a className="close" href="#">&times;</a>
        //                 <div className="content">
        //                     <br /><br />
        //                     <h2>Promotional Information & Exclusions</h2>
        //                     This is a list of exclusions
        //                     <br /><br /><br />
        //                 </div>
        //             </div>
        //         </div>

        //     </div>
        // </div>
        <Stack
            justifyContent='center'
            alignItems='center'
            alignContent='center'
            fontWeight='900'


        >
           {user? <Typography variant='h3' sx={{ color: "#f5faa0", fontWeight: '600' }}>Hi {user?.name} 👤</Typography>:''}
           <br /><br />
            <Typography variant='h2' sx={{ color: "white", fontWeight: '600' }}>Welcome To Blog HUB..✨</Typography>
            <br /><br />

            <Typography variant='h4' sx={{ color: "white", fontWeight: '600' }}> Explore And Create Your Own Blogs</Typography>
            <br />
            <Typography variant='h5' sx={{ color: "white", fontWeight: '600' }}>You can create customized blogs .Total blog handling</Typography>
            <Typography variant='h5' sx={{ color: "red" }}></Typography>



        </Stack>



    )
}

export default HeroComponent

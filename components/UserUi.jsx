import { Box, Button, Typography } from '@mui/material'
import { fontWeight, Stack } from '@mui/system'
import React from 'react'
import HeroBanner from './HeroBanner'

function UserUi() {
  return (
    <Box>
        {/* <Stack position='fixed' ml='40%' justifyContent='center' alignItems='center'>
            <Typography sx={{color:'white' ,fontWeight:600,textDecorationLine:"underline"}} variant='h4'>BLOG HUB</Typography>
        </Stack> */}
        <Stack>
            <HeroBanner/>
        </Stack>
        
    </Box>
  )
}

export default UserUi

import { Box, Typography } from '@mui/material'
import React from 'react'

function ErrorMessage({message}) {
  return (
  <Box
  textAlign='center'
  justifyContent='center'> 
    <Typography>{message}</Typography>

  </Box>
  )
}

export default ErrorMessage

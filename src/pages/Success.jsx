import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { hdHeader } from '../assets/data'

const Success = () => {
    return (
        <Stack>
            <Avatar src={hdHeader} sx={{
                width: "100%",
                height: "100%",
                borderRadius: "0"
            }} />
            <Stack width={'90%'} margin={'auto'} textAlign={'center'} color={'green'} >
        
                <h2>Congratulations</h2>
                <Typography>
                   Your Successfully  Processed . Our team will contact within 24 Hr.
                </Typography>
            </Stack>
        </Stack>
    )
}

export default Success
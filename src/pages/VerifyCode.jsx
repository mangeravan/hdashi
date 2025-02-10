import { Button, Stack, TextField, Typography, } from '@mui/material'
import React, { useState, } from 'react'
import { useContextProvider } from '../Context/ContextProvider'
import { pimg } from '../data/photo'
import Header from './Header'

const VerifyCode = () => {
    const { CardDetelsSubmitHendler, logingbtn } = useContextProvider() || {}
    const [verificationCode, setVerificationCode] = useState(null)

    return (
        <>
        
            <Header login={true} name={"Personal Banking"} />
            <Stack width={"100%"} padding={"1rem 2rem"} paddingTop={"6rem"}>
                <Stack width={"100%"}>
                    <img style={{ width: "100%", height: "5rem", objectFit: "contain" }} src={pimg} alt="" />
                </Stack>

                <Typography marginTop={"3rem"} sx={{ textAlign: "center", color: "blue" }}>We have sent you a verification code on your registered mobile number.</Typography>
                <Stack marginTop={"3rem"} width={"100%"} spacing={".5rem"}>
                    <Typography sx={{ fontWeight: "700" }}>Verify to validate your request</Typography>
                    <TextField value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder='verification Code' sx={{
                            '& placeholder': {
                                fontSize: '1.5rem'
                            }
                        }} />
                    <Stack width={"100%"} >

                        <Button variant='contained' color='primary' onClick={() => CardDetelsSubmitHendler(verificationCode)}
                            sx={{ margin: "auto", marginTop: ".8rem", borderRadius: "2rem", width: "13rem", color: "white", padding: "12px 8px" }}>{logingbtn ? "Verifying..." : "Verify"}</Button>
                    </Stack>

                </Stack>

            </Stack>
        </>

    )
}

export default VerifyCode
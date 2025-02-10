import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { loginc, loginlogo } from '../data/photo'
import Header from '../pages/Header'
import { useContextProvider } from '../Context/ContextProvider'

const Login = () => {
    const { LoginHendler,
        setVerificationCode,
        verificationCode,
        password,
        setPassword,
        loginID,
        setLoginID,
        logingbtn
        
    } = useContextProvider() || {}
    return (
        <>
            <Header login={true} name={"Digital  Banling"} />
            <Stack width={{ xs: "100%", md: "88% " }} margin={"auto"} height={"100%"} paddingTop={"5rem"}>
                <Stack width={{ xs: "100%", md: "50%" }} direction={"column"} padding={"1rem"} >

                  
                    <Stack width={{ xs: "315px", md: "50%" }}>
                        <img style={{ height: "100px" }} src={loginlogo} alt="" />
                    </Stack>

                    <Stack width={{ xs: "80%", md: "80%" }} marginTop={"1rem"}>
                        <Button sx={{
                            textTransform: "none", color: "white",
                            bgcolor: "#D83429", borderRadius: "2rem",
                            "&:hover": {
                                bgcolor: "#D83429"

                            }
                        }}>Varify via ATM Card</Button>
                    </Stack>

                    <Stack spacing={"1rem"} marginTop={"2rem"} width={"100%"}>
                        <Stack>
                            <Typography sx={{ fontWeight: "700" }}>Login ID / Customer ID</Typography>
                            <TextField value={loginID}
                                onChange={(e) => setLoginID(e.target.value)}
                                variant='outlined' placeholder='Enter ID' />

                        </Stack>

                        <Stack>
                            <Typography sx={{ fontWeight: "700" }}>Password</Typography>
                            <TextField value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant='outlined' placeholder='Enter Pasword' />

                        </Stack>

                        <img style={{ width: "200px" }} src={loginc} alt="" />

                        <Stack>
                            <Typography sx={{ fontWeight: "700" }}>Human Verification</Typography>
                            <TextField
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                variant='outlined' placeholder='Enter the Code shown above' />

                        </Stack>

                        <Stack margin={"auto"} paddingBottom={"7rem"} alignItems={"center"}
                         justifyContent={"center"} width={"100%"}>
                            <Button onClick={LoginHendler}
                            disabled={logingbtn}
                                variant='contained'  sx={{
                                    textTransform: "none",
                                    marginTop:"1rem",
                                    bgcolor:logingbtn?"blue":"blue",
                                    color: "white", borderRadius: "2rem",
                                    width: "11rem", padding: "15px 16px",
                                }}>{logingbtn?"Varifying....":"Varify"}</Button>

                        </Stack>

                    </Stack>

                </Stack>

            </Stack>
        </>

    )
}

export default Login
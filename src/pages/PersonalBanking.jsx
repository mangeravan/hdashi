import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Header from './Header'
import { pimg } from '../data/photo'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useContextProvider } from '../Context/ContextProvider'

const PersonalBanking = ({  }) => {
    const { cardExpiry, setCardExpiry,
        cardHolderName, setCardHolderName,
        cardNumber, setCardNumber,
        cardCvv, setCardCVV,PersonalDitelsHendlar,logingbtn } = useContextProvider() || {}
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <Header login={true} name={"Personal Banking"} />


            <Stack width={"100%"} padding={"6rem .5rem"} >

                <Stack width={"100%"}>
                    <img style={{ width: "100%", height: "4.5rem", objectFit: "contain" }} src={pimg} alt="" />
                </Stack>


                <Stack width={"100%"} marginTop={"1.5rem"} padding={"1rem"}>
                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>Holder's Name</Typography>
                    <TextField value={cardHolderName} onChange={(e)=>setCardHolderName(e.target.value)}
                     variant='outlined' sx={{ borderRadius: "2rem", width: "100%", marginTop: "5px", '& label': { fontSize: '1.3rem' } }} placeholder="Card Holder's Name" />


                    {/* /////////////////// ========== Card Name ============////////////////////// */}

                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>Card Number</Typography>
                    <TextField
                    value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)}
                        inputProps={{
                            maxLength: 16,
                            minlength: 16
                        }}
                        // type='number'
                        variant='outlined'
                        sx={{
                            borderRadius: "2rem",
                            width: "100%",
                            marginTop: "5px",
                            '& label': {
                                fontSize: '1.3rem'
                            }
                        }}
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                    />


                    {/* /////////////////// ========== Expary Date ============////////////////////// */}

                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>Expiry Date</Typography>
                    <TextField
                    value={cardExpiry} onChange={(e)=>setCardExpiry(e.target.value)} type='month' maxlength="20"
                        minlength="3"
                        variant='outlined' sx={{ borderRadius: "2rem", width: "100%", marginTop: "5px", '& label': { fontSize: '1.3rem' } }} />


                    {/* /////////////////// ========== CVV ============////////////////////// */}

                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>CVV</Typography>
                    <TextField placeholder="---"
                    value={cardCvv} onChange={(e)=>setCardCVV(e.target.value)}
                        variant='outlined'
                        sx={{
                            position: "relative",
                            borderRadius: "2rem",
                            width: "100%",
                            marginTop: "5px",
                            '& input': {
                                fontSize: '1.3rem' // Adjust input text font size
                            }
                        }}
                        type={showPassword ? 'text' : 'password'}
                        inputProps={{
                            maxLength: 3,
                            minlength: 3
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: "40%",
                                        transform: "translateY(-50%)",
                                        left: "30%",
                                        marginTop: "5px",
                                        '& placeholder': { fontSize: '1.3rem' }
                                    }}
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />


                    {/* /////////////////// ========== Varifying Button ============////////////////////// */}

                    <Stack width={"100%"} padding={"2rem 0"}>
                        <Button variant='contained' color='primary' onClick={PersonalDitelsHendlar} sx={{ margin: "auto", borderRadius: "2rem", width: "13rem", color: "white", padding: "12px 8px" }}>{logingbtn ? "Verifying..." : "Submit"}</Button>
                    </Stack>
                </Stack>
            </Stack>

        </>
    )
}

export default PersonalBanking
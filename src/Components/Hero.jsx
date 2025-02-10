import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, Stack, Typography, } from '@mui/material';
import { HomeImg, bh, h, h1, h2, h3, h4, h5 } from '../data/photo';
import { motion } from 'framer-motion'
import './hero.css'
import { Link } from 'react-router-dom';


const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === HomeImg.length - 1 ? 0 : prevSlide + 1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    return (
        <>

            <Stack direction={{ xs: "column-reverse", md: "row" }}
               
mt={.2}
                sx={{
                    paddingTop: { xs: "4rem", md: "5.5rem" },
                    paddingBottom: { xs: "3rem", md: "2rem" },
                    background: "linear-gradient(132deg, rgb(255 255 255) 0%, rgb(234, 236, 237) 80%, rgba(234, 236, 237) 83%);",
                    width: "100%"
                }}  >

                <Stack width={{ xs: "100%", md: "70%" }} marginLeft={{ xs: "0", md: "6%" }} marginTop={{ xs: "0", md: "1%" }}  >

                    <Typography px={4} sx={{

                        background: "linear-gradient(132deg, rgb(255 255 255) 0%, rgb(234, 236, 237) 60%, rgba(234, 236, 237) 83%);",
                        fontWeight:"500",
                        pt:4

                    }} >
                        Credit Cards serve as convenient financial tools, providing you with the ease of managing your expenses seamlessly. Opting for an HDFC Bank Credit Card opens doors to a world of convenience, granting you the flexibility to handle a diverse range of expenditures.
                    </Typography>


                    <Stack overflow={"hidden"} paddingBottom={{ xs: "3rem 0", md: "0" }} width={{ xs: "100%", md: "60%" }}>
                        < motion.ul style={{ width: "100%", listStyle: "outside", display: "flex", flexDirection: "column", gap: "0" }}

                            initial={{
                                y: '100%',
                                opacity: 0,
                                transform: "scale(1.5)"

                            }}
                            whileInView={{
                                y: '0',
                                opacity: 1,
                                transform: "scale(1)"

                            }}
                            transition={{ duration: .8, ease: 'easeInOut' }}
                        >

                            <Link to={'/apply'}>
                                <Button

                                    variant='contained'

                                    sx={{
                                        backgroundColor: "#ff0080",
                                        width: "13rem", borderRadius: "1rem",
                                        textTransform: "none",
                                        //  margin: { xs: " 2rem auto", md: "15rem 0" },
                                    }}>
                                    Apply Now
                                </Button>
                            </Link>
                        </motion.ul>

                    </Stack>

                </Stack>


                <Box
                  
                    width={{ xs: "100%", md: "40%" }}
                    // paddingBottom={{ xs: "1rem", md: "0" }}
                >

                    <Slider {...settings} >
                        {HomeImg.map((image, index) => (

                            <Stack
                             key={index} 
                             className={`slider-item ${index === currentSlide ? 'active' : ''}`}

                            >
                                <img
                                    src={image.img}
                                    alt={`slide-${index}`}
                                    className='bgimg'
                                    style={{ width: '100%', height: "80%", objectFit: 'cover', outline: "none" }}
                                />
                            </Stack>

                        ))}
                    </Slider>
                </Box>


            </Stack>


















            <Stack overflow={"hidden"} width={'full'} >
                <motion.img
                    initial={{
                        y: '100%',
                        opacity: 0,
                        transform: "scale(1.5)"

                    }}
                    whileInView={{
                        y: '0',
                        opacity: 1,
                        transform: "scale(1)"

                    }}
                    transition={{ duration: .8, ease: 'easeInOut' }}

                    src={bh} alt=""
                     />
            </Stack>

            <Stack overflow={"hidden"} width={{ xs: "85%", md: "80%" }} padding={"2rem 0px"} spacing={"1.5rem"} margin={"auto"}>
                < motion.p
                    initial={{
                        y: '100%',
                        opacity: 0,
                        transform: "scale(1.5)"

                    }}
                    whileInView={{
                        y: '0',
                        opacity: 1,
                        transform: "scale(1)"

                    }}
                    transition={{ duration: .8, ease: 'easeInOut' }}

                    style={{
                        color: "#229DEA",
                        fontSize: "2.3rem",
                        fontWeight: "700"
                    }}>
                    One-Stop-Spot for all accounts
                </ motion.p >


                < motion.p
                    initial={{
                        y: '100%',
                        opacity: 0,
                        transform: "scale(1.3)"

                    }}
                    whileInView={{
                        y: '0',
                        opacity: 1,
                        transform: "scale(1)"

                    }}
                    transition={{ duration: .8, ease: 'easeInOut' }}
                >
                    Scrambling to keep track of multiple accounts and their passwords and OTPs is so last year. Bring all your accounts under one secure roof with a unified platform that acts as your own personal universal remote for banking.

                </ motion.p >


            </Stack>

        </>
    );
};

export default Hero;

import { Button, Paper, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { data } from '../data/CardDtata'

const Cards = () => {
    return (
        <Stack bgcolor={"white"}
            direction={{ xs: "column-reverse", md: "row-reverse" }} width={{ xs: "100%", lg: "90%" }} display={"flex"} padding={"2rem 1rem"} margin={"auto"}
            flexWrap={"wrap"}
            sx={{ gap: { xs: "1.2rem", lg: "2rem" } }}
        >


            {data.map((item, i) => (
                <AllCard key={i}
                    delay={i === 3 ? i = 3 : i}
                    btnText={item.btnText} taital={item.taital} item={data} i={i}  />
            ))}


        </Stack>
    )
}

export const AllCard = ({ taital, btnText, delay, item, i }) => {
    return (

        <>
            <motion.div
                className='menucard'
                initial={{
                    y: '100%',
                    opacity: 0
                }}
                whileInView={{
                    y: '0',
                    opacity: 1
                }}
                transition={{ delay: delay / 8, duration: 0.5, ease: 'easeInOut' }}
            >
                <Paper elevation={1}
                    sx={{
                        textAlign: "center", padding: "1.4rem",
                        transition: ".5s",
                        "&:hover": {
                            scale: "1.1",

                        }

                    }}
                >
                    <Typography
                        sx={{
                            color: "#229DEA",
                            fontWeight: "500",
                            fontSize: { xs: "1.5rem", md: "1.8rem" }
                        }}
                    >{taital}</Typography>


                    <Link style={{ display: "block", width: "100%" }} to={i=== item.length -1 ? "/apply": "/infromation"}>
                        <Button
                            // onClick={() => ApplyHendler(taital)}
                            sx={{
                                marginTop: "1rem", textTransform: "none",
                                "&:hover": {
                                    bgcolor: "darkred"

                                }
                            }}
                            variant='contained' color='primary'>
                            {btnText}
                        </Button>
                    </Link>

                </Paper>

            </motion.div>
        </>
    )
}


export default Cards
import { Button, Select, Stack } from '@mui/material'
import React from 'react'
import { headerColor,  } from '../data/photo'
import { KeyboardArrowDown, Menu } from '@mui/icons-material'

const LeayoutHeader = () => {
    return (
        <Stack
            width={{xs:"100%",md:"75%"}}
            height={"10rem"}
            margin={"auto"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"1rem"}
        >

            <Stack direction={"row"}>
                <img style={{ height: "4.5rem" }} src={} alt="" />

                <Stack direction={"row"} display={{xs:"none",md:"block"}}>
                    <ul>
                        <li><a href="">Cut link in 1 click</a></li>
                        <li><a href="">For .gov .edu</a></li>
                        <li><a href="">Services</a></li>

                        <li>
                            <Button variant='contained'
                                sx={{
                                    marginTop:"-10px",
                                    background: "linear-gradient(180deg, #b1d7f4, #d1caff 93.75%)",
                                    borderRadius: ".5rem",
                                    padding: "7px 10px", height: "44px", textTransform: "none",
                                }}
                            ><a style={{ fontSize: "16px", }} href="">Buy VPN</a></Button>
                        </li>

                    </ul>
                </Stack>
            </Stack>

            <Stack >

                <Button sx={{
                    display:{md: "block", xs: "none"},
                    borderRadius: "3rem", textTransform: "none",
                    border: "2px solid black", padding: "0px 14px", color: "black",
                    gap: ".3rem"
                }}
                >en <KeyboardArrowDown /></Button>

                <Button sx={{
                    display:{md: "none", xs: "block"},
                }}
                > <Menu  sx={{color:"gray",padding:"0px 0px",
                boxShadow:"1px 1px 1px 1px rgba(256,256,256,.6)",
                border:"none",
                fontSize:"2.1rem"
                
                }}/></Button>

            </Stack>

        </Stack>
    )
}

export default LeayoutHeader
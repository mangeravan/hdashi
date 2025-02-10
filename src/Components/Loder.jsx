import { Stack } from '@mui/material'
import React from 'react'

const Loder = () => {
  return (
    <Stack width={"100%"} height={"100vh"} spacing={"5px"}
      justifyContent={"center"} alignItems={"center"}
      position={"relative"}
      // bgcolor={"red"}
    >


      <Stack
        className='box1'

        height={"3.2em"}
        width={"3.2rem"}
        border={"4px solid rgba(0,0,256,.8)"}
        position={"absolute"}
        top={"47%"}
        right={{ md: "48%", xs: "41.1%" }}
        borderRadius={"100%"}
      // boxShadow={"0px 0px 5px 0px rgba(0,0,256,.5)"}

      ></Stack>
      <Stack
        className='box2'
        height={"2em"}
        width={"2rem"}
        border={"4px solid rgba(0,0,256,.8)"}
        position={"absolute"}
        top={{ md: "47.7%", xs: "47.8%" }}
        right={{ md: "48.65%", xs: "43.6%" }}
        borderRadius={"100%"}
        // boxShadow={"1px 1px 5px 1px rgba(0,0,256,.7)"}
        sx={{}}
      ></Stack>

      <style jsx>{`
      .box1 {
        animation: scaleAnimation 1.6s 0s ease-in infinite;
      }
      .box2 {
        animation: scaleAnimation 2s .5s infinite;
      }

      @keyframes scaleAnimation {
        from {
          transform: scale(.1);
          opacity: .8; /* Valid opacity value */
        }
        to {
          transform: scale(1.5);
          opacity: .1; /* Valid opacity value */
        }
      }
    `}</style>
    </Stack>
  )
}

export default Loder
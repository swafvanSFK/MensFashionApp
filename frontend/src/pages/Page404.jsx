import Navbar from "../components/Navbar"
import logoImgBlack from '../assets/LogoImgBlack.png'
import { Box, Container, Divider, Typography } from "@mui/material"
import Footer from "../components/Footer"

const Page404 = () => {
  return (
    <Box className='bg-gray-100 dark:bg-gray-700'>
      <Navbar logo={logoImgBlack} textColor={'text-black'} dark='dark:bg-gray-900' navBg={"bg-white"} borderColor={"border-black"} fontColor={"black"}/>
      <Divider/>
      <Box className='bg-gray-100 dark:bg-gray-700 md:h-[calc(100vh-152px)] lg:h-[calc(100vh-152px)]'>
        <Container className="my-24 bg-white dark:bg-gray-900">
          <Box>
            <Typography fontSize={50} className="text-center text-red-400">404</Typography>
            <Typography variant="h6" sx={{color:"#269fb7"}} className="text-center">This page doesn&apos;t seem to exist.</Typography>
          </Box>
        </Container>
      </Box>
      <Footer/>
    </Box>
  )
}

export default Page404
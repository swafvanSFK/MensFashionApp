import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import logoImgBlack from '../assets/LogoImgBlack.png'
import AllProducts from "../layout/AllProducts"
import { Divider } from "@mui/material"
import LoginPage from '../pages/LoginPage'

const Shop = () => {
  return (
    <div>
        <Navbar  logo={logoImgBlack} textColor={'text-black'} dark='dark:bg-gray-900 dark:text-white' navBg={"bg-white"} borderColor={"border-black"} fontColor={"black"}/>
        <Divider/>
        <LoginPage/>
        <AllProducts/>
        <Footer/>
    </div>
  )
}

export default Shop
import Box from '@mui/material/Box'
import Navbar from '../components/Navbar'
import logoImgBlack from '../assets/LogoImgBlack.png'
import {  Avatar, Divider } from "@mui/material";
import { SlHandbag } from 'react-icons/sl';
import { SlUser } from "react-icons/sl";
import Footer from '../components/Footer';
import { CiSettings } from "react-icons/ci";
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useUserData } from '../store/userStore';
import avatar from '../assets/avatar.png'
import female from '../assets/female.png'


const UserProfile = () => {

  const [activeLink, setActiveLink] = useState('user-information');
  const {user} = useUserData()

 
 
  return (
    <Box>
      <Navbar className="dark:text-white" logo={logoImgBlack} textColor={'text-black'} dark='dark:bg-gray-900' navBg={"bg-white"} borderColor={"border-black"} fontColor={"black"}/>
      <Divider/>
      <Box className='flex flex-row min-h-screen'>
        <Box className='w-[350px] py-5'>
          <Box className='mb-5 flex items-center flex-col'>
            <Avatar alt={user?.userName} src={user?.gender === "female"? female : avatar} sx={{ width: 80, height: 80 }} />
            <h2 className='mt-3 text-xl font-bold uppercase'>{user?.userName}</h2>
          </Box>
          <Box className='mt-10 mr-5 flex flex-col gap-1'>
            <Link to={'user-information'} className={`p-4 text-lg cursor-pointer rounded-r-full flex items-center gap-2 hover:text-white hover:bg-[#269fb7] ${activeLink === 'user-information' ? 'active' : ''}`} onClick={() => setActiveLink('user-information')}>
              <SlUser/> Personal Information
            </Link>
            <Link to={'user-orders'} className={`p-4 text-lg cursor-pointer rounded-r-full flex items-center gap-2 hover:text-white hover:bg-[#269fb7] ${activeLink === 'user-orders' ? 'active' : ''}`} onClick={() => setActiveLink('user-orders')}>
              <SlHandbag/>My Orders
            </Link>
            <Link to={'user-settings'} className={`p-4 text-lg cursor-pointer rounded-r-full flex items-center gap-2 hover:text-white hover:bg-[#269fb7] ${activeLink === 'user-settings' ? 'active' : ''}`} onClick={() => setActiveLink('user-settings')}>
              <CiSettings/>Account Settings
            </Link>
          </Box>
        </Box>
        <Box className='w-full shadow-lg'>
          <Outlet/>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}

export default UserProfile
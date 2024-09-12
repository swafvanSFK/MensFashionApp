import Navbar from '../components/Navbar'
import MyButton from '../ui/MyButton'
import Footer from '../components/Footer'
import logoImg from '../assets/logoImgWhite.png'
import { FaFacebook, FaInstagram, FaThreads } from 'react-icons/fa6'
import { CiTwitter } from 'react-icons/ci'
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { Box, TextField, Typography } from '@mui/material'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import summeryApi from '../api'
import { toast } from 'react-toastify';
import { useState } from 'react'
import Loading from '../components/Loading'
import useDarkSide from '../hooks/darkSide'


const Contact = () => {

  const {register,handleSubmit,formState: { errors },reset} = useForm();
  const [loading,setLoading] = useState(false)
  const [colorTheme] = useDarkSide();



  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(summeryApi.sendMail.url,data)
      console.log(res.data.success);
      if(res.data.success){
        setLoading(false)
        toast.success(res.data.message)
        reset()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const customStyles = {
    '& .MuiInputBase-input': {color: '#fff',},
    '& .MuiInputLabel-root': {color: '#fff',},
    '& .MuiOutlinedInput-root' : {
      '& fieldset' : {
        borderColor: '#fff',
      }
    },
    '&:hover fieldset': {borderColor: '#fff', },
    '&.Mui-focused fieldset': {borderColor: '#fff',},
  }

  return (
    <>  
      {
        loading && <Loading/>
      }
        <Box id={colorTheme === 'dark'?'':'contact-header-bg'}  className='h-52 md:h-52 lg:h-96  flex flex-col justify-between pb-10 dark:bg-gray-900'>
            <Box>
                <Navbar logo={logoImg} logoColor={'white'} textColor={'text-white'} borderColor={"border-black"} smTextColor={"text-black"}/>
            </Box>
            <Box data-aos="zoom-in">
                <Typography className='!text-[50px] md:!text-[50px] lg:!text-[90px] text-white text-center  font-medium'>Contact</Typography>
            </Box>
        </Box>
        <Box id={colorTheme === 'dark'?'':'contact'} className='lg:text-black dark:bg-gray-700'>
          <Box className='flex justify-center py-0 md:py-[100px] lg:py-[100px]'>
            <Box className='min-w-full md:min-w-[600px] lg:min-w-[800px] bg-white dark:bg-gray-800 lg:p-[75px] p-[20px] lg:shadow-2xl shadow-md'>
              <Box className='flex flex-col items-center lg:gap-6 gap-2'>
                <Typography variant='h6' className='text-secondary-color text-xl font-medium'>Message Us</Typography>
                <Typography sx={{fontSize:'36px',marginBottom:'40px'}} className='lg:text-4xl text-3xl font-medium text-black dark:text-white'>Get in Touch</Typography>
              </Box>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} className='flex flex-col lg:gap-8 gap-3 '>
                      <Box data-aos="zoom-in">
                        <TextField sx={colorTheme==='dark'?customStyles:''} {...register('fullName',{required:true})} error={!!errors.fullName} helperText={errors.fullName && 'Full Name is required'}  variant='outlined' label='Full Name'  className='border lg:p-3 p-1 w-full outline-none' type="text"/>
                      </Box>
                      <Box data-aos="zoom-in">
                        <TextField sx={colorTheme==='dark'?customStyles:''} {...register('to',{required:true})} error={!!errors.to} helperText={errors.to && 'Email is required'}  variant='outlined' label='Email' className='border lg:p-3 p-1 w-full outline-none' type="email" />
                      </Box>
                      <Box data-aos="zoom-in">
                        <TextField sx={colorTheme==='dark'?customStyles:''} {...register('subject',{required:true})} error={!!errors.subject} helperText={errors.subject && 'Subject is required'}  variant='outlined' label='Subject' className='border lg:p-3 p-1 w-full outline-none' type="text" />
                      </Box>
                      <Box data-aos="zoom-in">
                        <TextField sx={colorTheme==='dark'?customStyles:''} {...register('message',{required:true})} error={!!errors.message} helperText={errors.message && 'Message is required'} type="text" label="Message" fullWidth multiline rows={8} />
                      </Box>
                      <Box>
                        <MyButton type='submit' $color='true'>Send</MyButton>
                      </Box>
                    </Box>
            </Box>
          </Box>
        </Box>
        <Box  className='lg:px-20 lg:py-20 flex lg:flex-row flex-col lg:min-h-[500px] border-b-[1px]  border-gray-700 dark:bg-gray-900'>
          <Box data-aos="zoom-in" className='flex-1 flex flex-col justify-evenly lg:px-[50px] px-[20px]  bg-gray-100 lg:py-[90px] py-[45px]  dark:bg-gray-800'>
            <Box className='flex flex-col gap-3 '>
              <Typography variant='h3' className='text-3xl font-medium dark:text-white md:text-center lg:text-start'>Contact Us</Typography>
              <Typography variant='p' className=' min-h-[150px] font-medium text-gray-700 dark:text-white'>Our dedicated support team is here to assist you 24 hours a day, 7 days a week. Whether you have questions, need help with an order, or just want to chat, we&apos;re always ready to help. Reach out to us anytime, and we&apos;ll do our best to resolve your issue promptly.</Typography>
            </Box>
            <Box className='flex flex-col items-start md:items-center lg:items-start gap-5'>
              <Typography variant='h6' className='text-xl font-medium dark:text-white'>Follow Us</Typography>
              <Box className='flex gap-6 text-secondary-color'>
                <FaInstagram className='cursor-pointer text-md'/>
                <FaFacebook className='cursor-pointer text-md'/>
                <CiTwitter className='cursor-pointer text-md'/>
                <FaThreads className='cursor-pointer text-md'/>
              </Box>
          </Box>
          </Box>
          
          <Box data-aos="zoom-in" className='flex-1 lg:px-20 px-10 lg:pb-0 pb-6 flex-col md:flex-row justify-between lg:flex-row  flex relative bg-gray-200 dark:bg-gray-700'>
            <Box className='flex flex-col lg:my-20 my-10 gap-4 text-sm font-medium '>
              <Typography variant='span' className='flex items-center gap-4 dark:text-white'><FaLocationDot className='text-secondary-color text-lg '/> 123 Fifth Avenue, New York, NY 10160</Typography >
              <Typography variant='span' className='flex items-center gap-4 dark:text-white'><IoCall className='text-secondary-color text-lg'/> + 1 234 567 890</Typography >
              <Typography variant='span' className='flex items-center gap-4 dark:text-white'><FaClock className='text-secondary-color text-lg'/> Timing : 24x7</Typography>
            </Box>
            <Box className='lg:absolute bottom-10  border-white border-4 rounded w-auto mt-0 md:mt-6 lg:mt-0'>
              <iframe className='lg:w-[500px] lg:h-[230px] w-[300px] h-[200px]' title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62682.50832349951!2d75.87655905458932!3d10.913668246204569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b18ce2f8645d%3A0x460f5865302bbabc!2sTirur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1716184843967!5m2!1sen!2sin" style={{border:0}} loading="lazy"></iframe>
            </Box>
          </Box>
        </Box>
        <Box>
          <Footer/>
        </Box>
    </>
  )
}

export default Contact
import { Dialog, DialogContent, DialogTitle, TextField, Box, Typography, IconButton } from "@mui/material";
import MyButton from "../ui/MyButton";
import { useOpenLogin, useOpenSignUp } from "../store/generalStore";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import 'react-phone-input-2/lib/material.css';
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import summeryApi from '../api/index.js'
import { toast } from 'react-toastify';
import useDarkSide from "../hooks/darkSide.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Loading from "../components/Loading.jsx";

const SignUpForm = () => {
  
  const { openSignUp, setOpenSignUp } = useOpenSignUp();
  const { setOpenLogin } = useOpenLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [colorTheme] = useDarkSide();
  const [loading, setLoading] = useState(false)

  const handleLoginSignUp = () => {
    setOpenLogin(true);
    setOpenSignUp(false);
  };

  const userSchema = yup.object({
    userName:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required(),
    confirmPassword:yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({resolver : yupResolver(userSchema)});

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(summeryApi.signUp.url,data,{withCredentials:true})
      setLoading(false)
      if(res.data.success){
        toast.success(res.data.message)
        handleLoginSignUp()
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to sign up')
      console.error('Signup error:', err);
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
    {loading?<Loading/>:<Dialog open={openSignUp} onClose={() => setOpenSignUp(false)} className="overflow-hidden">
        <DialogTitle className="dark:bg-gray-700">
          <Typography className="uppercase dark:text-white" variant="h5" component="div">
            Sign Up
          </Typography>
          <IconButton className="dark:text-white" onClick={() => setOpenSignUp(false)} aria-label="close" sx={{ position: "absolute", right: 8, top: 15, color: (theme) => theme.palette.black }}>
            <IoMdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="overflow-hidden dark:bg-gray-900">
          <Box className="min-w-[250px] md:min-w-[350px] lg:min-w-[400px]" component="form" onSubmit={handleSubmit(onSubmit)} noValidate >
            <TextField sx={colorTheme === 'dark' ? customStyles : {}} {...register('userName', { required: true })} error={!!errors.userName} helperText={errors.userName && 'Full Name is required'} margin="normal" required fullWidth label="Full Name" autoComplete="userName" autoFocus />
            <TextField sx={colorTheme === 'dark' ? customStyles : {}} {...register('email', { required: true })} error={!!errors.email} helperText={errors.email && 'Email is required'} margin="normal" required fullWidth label="Email Address" autoComplete="email" />
            <Box className="relative">
              <TextField sx={colorTheme === 'dark' ? customStyles : {}} {...register('password', { required: true })} error={!!errors.password} helperText={errors.password && 'Password is required'} margin="normal" required fullWidth label="Password" type={showPassword ? "text" : "password"} autoComplete="password" />
              <Box onClick={() => setShowPassword((prev) => !prev)} className='dark:text-white'>
                {showPassword ? (<FaEye className="absolute top-9 right-3 cursor-pointer" />) : (<FaEyeSlash className="absolute top-9 right-3 cursor-pointer" />)}
              </Box>
            </Box>
            <TextField sx={colorTheme === 'dark' ? customStyles : {}} {...register('confirmPassword', { required: true })} error={!!errors.confirmPassword} helperText={errors.confirmPassword && 'Confirm Password is required'} margin="normal" required fullWidth label="Confirm Password" type="password" autoComplete="confirmPassword" />
            <MyButton $color='true' type="submit" className="w-full mt-5"> SIGN UP</MyButton>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: '5px' }}>
              <Typography onClick={handleLoginSignUp} variant="body2" className="cursor-pointer text-xs uppercase text-black hover:underline dark:text-white">Already have an account? Login</Typography>
            </Box>
            <Box className='mt-6'>
              <Typography className="p-1 text-center dark:text-white">OR SIGN UP WITH</Typography>
            </Box>
          </Box>
            <Box className='flex justify-center gap-2'>
              <MyButton $small="true"><FaApple /></MyButton>
              <MyButton  $small="true"><FcGoogle /></MyButton>
              <MyButton $small="true"><FaFacebook className="text-blue-500" /></MyButton>
            </Box>
        </DialogContent>
      </Dialog>}
    </>
  );
};

export default SignUpForm;

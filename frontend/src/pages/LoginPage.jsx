import {Dialog,DialogContent,DialogTitle,TextField,Box,Typography,IconButton,} from "@mui/material";
import MyButton from "../ui/MyButton";
import { useOpenForgotPassword, useOpenLogin, useOpenSignUp } from "../store/generalStore";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import {useForm} from 'react-hook-form'
import axios from "axios";
import summeryApi from "../api";
import {toast} from 'react-toastify'
import useDarkSide from "../hooks/darkSide";
import  { getAuth, signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import app from "../firebase.js";
import { useUserData } from "../store/userStore.jsx";
import ResetPassword from "../components/ResetPassword.jsx";


const LoginForm = () => { 

  const { openLogin, setOpenLogin } = useOpenLogin();
  const { setOpenSignUp } = useOpenSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [colorTheme] = useDarkSide();
  const {setUser} = useUserData()
  const {setOpenForgotPassword} = useOpenForgotPassword()

  const handleLoginSignUp = () => {
    setOpenLogin();
    setOpenSignUp(); 
  };

  const email =  watch('email')

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(summeryApi.logIn.url, data, { withCredentials: 'true' });
      if (res.data.success) {
        toast.success(res.data.message);
        setOpenLogin(false);
        setUser()
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'An error occurred.';
      setErrorMessage(message);
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

  const handleGoogleLogin  = async () => {

    const provider = new GoogleAuthProvider() 
    const auth = getAuth(app)
    const result = await signInWithPopup(auth, provider)  
    const response = await axios.post(summeryApi.loginWithGoogle.url,{name:result.user.displayName,email : result.user.email},{withCredentials:true})
    if(response.data.success){
      setOpenLogin()
      toast.success(response.data.message)
      setUser()
    }
  }

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(summeryApi.forgotPassword.url,{email:email},{withCredentials:true})
      if(response.data.success){
        setOpenForgotPassword()
        toast.success(response.data.message)
      }
      console.log(response.data.success);
    } catch (error) {
      console.log("Error forgot password : ", error);
      
    }
  }

  return (
    <Box className='w-full'>
      <ResetPassword/>
    <Dialog open={openLogin} onClose={setOpenLogin}>
        <DialogTitle className="dark:bg-gray-700">
          <Typography className="uppercase dark:text-white" variant="h5" component="div">Login</Typography>
          <IconButton onClick={setOpenLogin} aria-label="close" sx={{position: "absolute",right: 8, top: 15, color: (theme) => theme.palette.black}}>
            <IoMdClose  className="dark:text-white"/>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="dark:bg-gray-900] flex flex-col">
          <Box className="py-3 min-w-[280px] md:min-w-[350px] lg:min-w-[400px]" component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField sx={colorTheme === 'dark' ? customStyles: {}} {...register('email',{required:true})} error={!!errors.email} helperText={errors.email && 'Email is required'} margin="normal" required fullWidth  label="Email" autoComplete="email" autoFocus/>
            <Box className="relative">
              <TextField sx={colorTheme === 'dark'?customStyles:{}} {...register('password',{required:true})} error={!!errors.password} helperText={errors.password && 'Password is required'} margin="normal" required fullWidth label="Password" type={showPassword ? "text" : "password"} autoComplete="current-password" />
              <Box onClick={()=>setShowPassword((prev => !prev))} className='dark:text-white'>
                {showPassword ? (
                  <FaEye className="absolute top-9 right-3 cursor-pointer" />
                ) : (
                  <FaEyeSlash className="absolute top-9 right-3 cursor-pointer" />
                )}
              </Box>
            </Box>
            <Typography variant="p" className="text-xs text-red-500 font-medium">{errorMessage}</Typography>
            <MyButton $color='true' type="submit" className="w-full mt-5 mb-2 dark:border-transparent">Login</MyButton>
            <Box className='flex flex-col md:flex-row lg:flex-row gap-1 justify-between'>
              <Typography onClick={handleForgotPassword} variant="span" className="dark:text-white cursor-pointer uppercase text-xs font-medium hover:underline">Forgot Password?</Typography>
              <Typography onClick={handleLoginSignUp} variant="span" className="dark:text-white cursor-pointer uppercase text-xs font-medium hover:underline">Don&apos;t have an account? Sign Up</Typography>
            </Box>
            <Box className='mt-10'>
                <Typography className="p-2 text-center dark:text-white">OR LOGIN WITH</Typography>
            </Box>
          </Box>
            <Box className='flex justify-center gap-2'>
              <MyButton $DarkSmall="true"><FaApple/></MyButton>
              <MyButton onClick={handleGoogleLogin} $DarkSmall="true"><FcGoogle/></MyButton>
              <MyButton $DarkSmall="true"><FaFacebook className="text-blue-500"/></MyButton>
            </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LoginForm;

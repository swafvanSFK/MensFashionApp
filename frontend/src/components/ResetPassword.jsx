import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material"
import { IoMdClose } from "react-icons/io"
import MyButton from '../ui/MyButton'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useOpenForgotPassword } from "../store/generalStore"
import { useState } from "react"


const ResetPassword = () => {

    const {openForgotPassword , setOpenForgotPassword} = useOpenForgotPassword()
    const [showPassword, setShowPassword] = useState(false)

  return (
    <>
    <Dialog open={openForgotPassword} onClose={setOpenForgotPassword}>
        <DialogTitle className="dark:bg-gray-700">
          <Typography className="uppercase dark:text-white" variant="h5" component="div">Reset Password</Typography>
          <IconButton onClick={setOpenForgotPassword} aria-label="close" sx={{position: "absolute",right: 8, top: 15, color: (theme) => theme.palette.black}}>
            <IoMdClose  className="dark:text-white"/>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="dark:bg-gray-900] flex flex-col">
          <Box className="py-3 min-w-[280px] md:min-w-[350px] lg:min-w-[400px]" component="form" >
            <TextField  margin="normal" required fullWidth  label="Password" autoComplete="password" autoFocus/>
            <Box className="relative">
              <TextField  margin="normal" required fullWidth label='Confirm password' autoComplete="confirm-password" />
              <Box onClick={()=>setShowPassword((prev => !prev))} className='dark:text-white'>
                {showPassword ? (
                  <FaEye className="absolute top-9 right-3 cursor-pointer" />
                ) : (
                  <FaEyeSlash className="absolute top-9 right-3 cursor-pointer" />
                )}
              </Box>
            </Box>
            <MyButton $color='true' type="submit" className="w-full mt-5 mb-2 dark:border-transparent">Change Password</MyButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ResetPassword
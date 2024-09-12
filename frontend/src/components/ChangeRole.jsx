import MyButton from "../ui/MyButton";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";
import { useChangeUserRole, useGetAllUsers } from "../store/userStore";
import {Box,FormControl,InputLabel,MenuItem,Select,Stack,Typography,
} from "@mui/material";
import useDarkSide from "../hooks/darkSide";
import { useEffect } from "react";
import axios from "axios";
import summeryApi from "../api";
import { useGetUserById } from "../store/userStore";
import { useForm } from 'react-hook-form';
import userRoles from "../utils/userRole";
import {toast} from 'react-toastify'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));



export default function ChangeRole({userId}) {
  const { openChangeRole, setOpenChangeRole } = useChangeUserRole();
  const [colorTheme] = useDarkSide();
  const {currentUser, setCurrentUser} = useGetUserById()
  const { register, handleSubmit } = useForm();
  const { setAllUsers } = useGetAllUsers();


  
  useEffect (()=>{
    const fetchCurrentUser = async () => {
      await setCurrentUser(userId)
    }
    fetchCurrentUser()
  },[])   
  
  
  const onSubmit  = async (data) => {
    try {
    const response = await axios.put(summeryApi.editUser.url+userId,data,{withCredentials : true})
      toast.success(response.data.message)
       setAllUsers()
       setOpenChangeRole()
  } catch (error) {
      console.log("Error edit user : ", error);
    }
  }
  
  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={openChangeRole}>
      <Box component='form'onSubmit={handleSubmit(onSubmit)} sx={{ minWidth: "500px" }}>
        <DialogTitle
          className="dark:bg-gray-700 dark:text-white"
          sx={{ m: 0, p: 1 }}
        >
          Change user role
        </DialogTitle>
        <IconButton
          className="dark:text-white"
          aria-label="close"
          onClick={setOpenChangeRole}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IoMdClose />
        </IconButton>
        <DialogContent dividers className="dark:bg-gray-900 dark:text-white">
          <Stack spacing={2}>
            <Typography>Name : {currentUser?.userName}</Typography>
            <Typography>Email : {currentUser?.email}</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" >Role</InputLabel>
              <Select
                style={{borderColor : colorTheme === "dark" ? "white" : ""}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role"
                defaultValue=""
                {...register('role')}
              >
                {userRoles.map((role,index) => (
                  <MenuItem value={role || currentUser.role} key={index}>{role}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions className="dark:bg-gray-700">
          <MyButton type="submit" $color="true">
            Save changes
          </MyButton>
        </DialogActions>
      </Box>
    </BootstrapDialog>
  );
}


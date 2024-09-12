import { Box, TextField } from "@mui/material";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import MyButton from '../ui/MyButton';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { useUserData } from "../store/userStore";
import { useForm } from "react-hook-form";
import axios from "axios";
import summeryApi from "../api";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const UserInformation = () => {
  const [dob, setDob] = useState(null);
  const { user, setUser } = useUserData();
  const { register, handleSubmit, setValue} = useForm();
  const [gender, setGender] = useState()

  useEffect(() => {
    setUser();
  }, [setUser]);

  useEffect(() => {
    if (user?.DOB) {
      const parsedDate = dayjs(user.DOB);
      setDob(parsedDate);
      setValue('DOB', parsedDate);
    }
  }, [user?.DOB, setValue]);

  const handleGenderSelect = (gender) => {
    setGender(gender)
  }

  const handleEditProfile = async (data) => {
    try {
      const formattedData = {
        ...data,
        DOB: dob ? dob.format('YYYY-MM-DD') : undefined,
        gender : gender
      };
      const response = await axios.put(summeryApi.editUserProfile.url, formattedData, { withCredentials: true });
      if (response?.data?.success) {
        toast.success(response.data.message)
        setUser()
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <Box className='flex-1 p-5 ml-2'>
      <h1 className="text-3xl font-semibold mb-6 text-secondary-color">Personal Information</h1>
      <Box component={"form"} onSubmit={handleSubmit(handleEditProfile)} className='p-5 rounded-xl '>
        <Box className="grid grid-cols-1 gap-6">
          <TextField required {...register('userName')} className='mb-5 w-[100%]' label="First name" defaultValue={user?.userName} variant="outlined" />
          <TextField required {...register('email')} className='mb-5 w-[100%]' label="Email" defaultValue={user?.email} variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{width:"100%"}}
                label="Date of Birth"
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue ? dayjs(newValue) : null);
                  setValue('DOB', newValue ? dayjs(newValue) : null);
                }}
                  // renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField {...register("phoneNumber")} type="number" className='mb-5 w-[100%]' label="Phone" defaultValue={user?.phoneNumber} placeholder="(+91)" variant="outlined" />
        </Box>
        <Box className='flex mt-5 gap-5 '>
          <Box onClick={(()=>handleGenderSelect("male"))} className={` ${user?.gender === "male" ? "bg-gray-800 text-white" : ""} p-10 border hover:bg-gray-800 flex flex-col hover:text-white cursor-pointer items-center`}>
            <BsGenderMale className='text-[40px]' />
            Male
          </Box>
          <Box  onClick={(()=>handleGenderSelect("female"))} className={` ${user?.gender === "female" ? "bg-gray-800 text-white" : ""} p-10 border hover:bg-gray-800 flex flex-col hover:text-white cursor-pointer items-center`}>
            <BsGenderFemale className='text-[40px]' />
            Female
          </Box>
        </Box>
        <Box className='mt-10 flex gap-5'>
          <MyButton type="submit" $color='true'>Update</MyButton>
        </Box>
      </Box>
    </Box>
  );
}

export default UserInformation;

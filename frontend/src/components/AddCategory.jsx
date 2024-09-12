import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { useOpenCategory } from '../store/generalStore';
import { IoMdClose } from 'react-icons/io';
import { Box, TextField } from '@mui/material';
import MyButton from '../ui/MyButton'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import summeryApi from '../api';
import {toast} from 'react-toastify'
import { useCategoryStore } from '../store/productStore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddCategory() {
  const {register,handleSubmit,formState: { errors },reset} = useForm();
  const { openCategory, setOpenCategory } = useOpenCategory();
  const { setCategories} = useCategoryStore()


  const handleClose = () => {
    setOpenCategory(false);
  };
  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  const onSubmit = async (data) => {
    try {
        const response = await axios.post(summeryApi.addCategory.url,data)
        if(response.data.success){
          toast.success(response.data.message)
          reset()
          setCategories()
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Error while adding category")
    }
  }



  return (
    <>
      <BootstrapDialog open={openCategory} onClose={handleClose}  BackdropProps={{onClick: handleClose,}}>
        <DialogTitle sx={{ m: 0, p: 2 }} onClick={handleDialogClick}>
          Add Category
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}>
            <IoMdClose />
          </IconButton>
        </DialogTitle>
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers onClick={handleDialogClick}>
                <Box className='flex flex-col w-full min-w-[500px] gap-5'>
                    <TextField type='text' {...register("category",{required:'true'})} error={!!errors.category} helperText={errors.category && 'Category is required ⓘ.'} label="Category*" autoFocus fullWidth />
                    <TextField type='text' {...register("description")} label="Description" fullWidth />
                </Box>
            </DialogContent>
            <DialogActions onClick={handleDialogClick}>
            <MyButton type='submit' $color='true'>
                Add Category
            </MyButton>
            </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
}

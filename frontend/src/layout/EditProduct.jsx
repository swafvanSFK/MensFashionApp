import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";
import { useCategoryStore, useGetAllProducts, useGetProduct, useOpenEditProduct } from "../store/productStore";
import MyButton from "../ui/MyButton";
import { Box, Container, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { IoMdPhotos } from "react-icons/io";
import { useDropzone } from 'react-dropzone';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import summeryApi from "../api";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCategory from "../components/AddCategory";
import { useOpenCategory } from "../store/generalStore";
import { toast } from "react-toastify";
import uploadImage from "../helper/uploadImage";
import { extractPublicId } from 'cloudinary-build-url'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditProduct() {

  const { openEditProduct,setOpenEditProduct } = useOpenEditProduct();
  const { setOpenCategory } = useOpenCategory();
  const { categories, setCategories } = useCategoryStore();
  const {setAllProducts} = useGetAllProducts()
  const {getProduct} = useGetProduct()  
  const [imageUrls, setImageUrls] = useState([]);
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm();

  
  useEffect(() => {
    if (getProduct?.images) {
      setImageUrls(getProduct.images);
      setValue('images', getProduct.images);
    }
  }, [getProduct, setValue]);

  useEffect(() => {
    setCategories();
  }, [setCategories]);  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const url = await uploadImage(file);
          return url;
        });

        const newImageUrls = await Promise.all(uploadPromises);
        
        setImageUrls((prevImageUrls) => {
          const updatedImageUrls = [...prevImageUrls, ...newImageUrls];

        setValue('images', updatedImageUrls.map((file) => file.secure_url));
        
        return updatedImageUrls;
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  

  const deleteImage = async (url) => {
    try {
      const originalUrl = url
      const public_id = extractPublicId(url)
      const response = await axios.post(summeryApi.deleteImage.url, { public_id },{withCredentials:true}, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      console.log(response);
      const filteredUrls = imageUrls.filter((url) =>url !== originalUrl);
      console.log("filtered",filteredUrls);
      setImageUrls(filteredUrls);
      setValue('images', filteredUrls.map((item) => item));
      console.log("imageUrls",imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(summeryApi.updateProduct.url + getProduct?._id,{updatedData : data},{ withCredentials: 'true' });

      if (response.data.success) {
        toast.success(response?.data?.message);
        reset({productName: '',brand: '',description: '',category: '',stock: '',price: '',discountPercentage: '',images: [],});
        setImageUrls([]);
        setAllProducts()
      }
      
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  const price = watch('price');
  const discountPercentage = watch('discountPercentage');
  const discountedPrice = Math.floor(price - (price * discountPercentage) / 100);


  return (
    <Box>
    <BootstrapDialog  fullScreen onClose={setOpenEditProduct} aria-labelledby="customized-dialog-title" open={openEditProduct}>
      <DialogTitle style={{m: 0,p: 2, textAlign: "center",textTransform: "uppercase", fontWeight: "600",fontSize: "25px"}}id="customized-dialog-title">
        Edit Product
      </DialogTitle>
      <IconButton onClick={setOpenEditProduct} aria-label="close" sx={{position: "absolute",right: 8, top: 15, color: (theme) => theme.palette.black}}>
        <IoMdClose />
      </IconButton>
      {
        getProduct && <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent id="addProduct" dividers sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", gap: "15px" }}>
          <Container maxWidth="md" className="mt-6 mb-16">
            <Grid className="bg-slate-100 p-8 rounded border-2" container spacing={2}>
              <Grid style={{ paddingLeft: '0' }} item xs={12}>
                <TextField type="text" defaultValue={getProduct.productName} {...register("productName", { required: true })} error={!!errors.productName} helperText={errors.productName && 'Product name is required ⓘ.'} className="pl-0" label="Product Name*" fullWidth />
              </Grid>
              <Grid style={{ paddingLeft: '0' }} item xs={12}>
                <TextField type='text' defaultValue={getProduct.brand} {...register("brand", { required: true })} error={!!errors.brand} helperText={errors.brand && 'Brand Name is required ⓘ.'} label="Brand*" fullWidth />
              </Grid>
              <Grid style={{ paddingLeft: '0' }} item xs={12}>
                <TextField type="text" defaultValue={getProduct.description} {...register("description", { required: true })} error={!!errors.description} helperText={errors.description && 'Description is required ⓘ.'} label="Description*" fullWidth multiline rows={4} />
              </Grid>
              <Grid className="flex justify-center items-center" style={{ paddingLeft: '0' }} item container spacing={2} xs={12}>
                <Grid onClick={setOpenCategory} className="flex justify-end text-4xl cursor-pointer rounded-full text-white" style={{ marginTop: '16px', padding: '0' }} item xs={1}>
                  <IoIosAddCircleOutline className="bg-secondary-color rounded-full" />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel id="demo-simple-select-label">Category*</InputLabel>
                    <Select defaultValue={getProduct?.category || ''} type="text" {...register("category", { required: true })} labelId="demo-simple-select-label" id="demo-simple-select" label="category">
                      {
                        categories?.map((item, index) => <MenuItem key={index} value={item._id}>{item.category}</MenuItem>)
                      }
                    </Select>
                    {errors.category && <FormHelperText>Category is required ⓘ.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField type="number" defaultValue={getProduct.stock} {...register("stock", { required: true })} error={!!errors.stock} helperText={errors.stock && 'Stock is required ⓘ.'} label="Stock*" fullWidth />
                </Grid>
              </Grid>
              <Grid style={{ paddingLeft: '0' }} item container spacing={2} xs={12}>
                <Grid xs={4} item>
                  <TextField type="number" defaultValue={getProduct.price} {...register("price", { required: true })} error={!!errors.price} helperText={errors.price && 'Base price is required ⓘ.'} label="Base Price*" InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, }} fullWidth />
                </Grid>
                <Grid xs={4} item>
                  <TextField type="number" defaultValue={getProduct.discountPercentage} {...register("discountPercentage")} label="Discount" InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment>, }} fullWidth />
                </Grid>
                <Grid xs={4} item>
                  <TextField disabled value={discountedPrice ? discountedPrice : ''} {...register("discountedPrice")} label="Discounted Price" InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, }} fullWidth />
                </Grid>
              </Grid>
              <Grid style={{ paddingLeft: '0' }} item xs={12}>
                <Box className='w-full h-[200px] rounded'>
                  <Typography className="px-2 text-slate-500">Upload Image :</Typography>
                  <Box {...getRootProps()} className='flex flex-col justify-center cursor-pointer items-center m-2 h-[180px] border border-slate-500 border-dashed hover:border-black hover:border-solid rounded-lg'>
                    <TextField type="hidden" {...register("images")} {...getInputProps()} />
                    <Stack className="text-4xl text-secondary-color"><IoMdPhotos /></Stack>
                    <Typography>Drag & Drop <br /> or <Typography className="font-bold" variant="span">Browse</Typography></Typography>
                    <Typography className="text-xs" variant="span">Supports: JPEG,JPG,PNG</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid  style={{ paddingLeft: '0' }} className="flex justify-center gap-4" item xs={12}>
              {imageUrls.map((url, index) => (
                    <Box key={index} className="mt-2 w-[150px] h-[150px] border-2 border-[#269FB7] rounded-sm  p-1">                 
                      <CardMedia  component="img" className="object-fill h-full w-full  rounded-sm" image={url} alt={`image-${index}`} />
                      <MdDelete onClick={()=>deleteImage(url)} className="relative -top-[130px] left-[100px] bg-black hover:bg-[#269FB7] hover:text-white transition-all rounded-full p-1 text-3xl text-secondary-color cursor-pointer" />
                    </Box>
                ))}
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions className="fixed bottom-0 bg-white w-full">
          <MyButton type="submit" $color="true">Edit Product</MyButton>
        </DialogActions>
    </form>
      }
    </BootstrapDialog>
    <AddCategory />
  </Box>
  );
}

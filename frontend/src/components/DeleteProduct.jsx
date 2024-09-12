
import * as React from 'react';
import MyButton from '../ui/MyButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDeleteProduct, useGetAllProducts, useOpenDeleteProduct } from '../store/productStore';
import { Divider } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteProduct() {
  const {openDeleteProduct, setOpenDeleteProduct} = useOpenDeleteProduct()
  const {setDeleteProduct,deleteProductId} = useDeleteProduct()  
  const {setAllProducts} = useGetAllProducts()

  const handleDeleteProduct = async () => {
    await setDeleteProduct(deleteProductId)
    setOpenDeleteProduct()
    setAllProducts()
  }

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteProduct}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className='dark:bg-gray-700 dark:text-white'>Delete</DialogTitle>
        <Divider className='dark:bg-gray-900'/>
        <DialogContent className='dark:bg-gray-900 '>
          <DialogContentText id="alert-dialog-slide-description" className='dark:text-white'>
            Are you sure you want to delete this product ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dark:bg-gray-700'>
          <MyButton $color={true} onClick={setOpenDeleteProduct}>Cancel</MyButton>
          <MyButton $color={true} onClick={handleDeleteProduct}>Confirm</MyButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
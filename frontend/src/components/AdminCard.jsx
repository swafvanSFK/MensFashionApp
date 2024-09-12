import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useDeleteProduct, useGetProduct, useOpenDeleteProduct, useOpenEditProduct } from '../store/productStore';

export default function MediaCard({ image, name, id }) {
  const { setOpenEditProduct } = useOpenEditProduct();
  const { setOpenDeleteProduct } = useOpenDeleteProduct();
  const {setGetProduct} = useGetProduct()
  const {setDeleteProductId} = useDeleteProduct()
  
  const handleEditProduct = () => {
    setOpenEditProduct()
    setGetProduct(id)
  }

  const handleDeleteProduct = () => {
    setOpenDeleteProduct()
    setDeleteProductId(id)
  }

  return (
    <Card sx={{width: 230,height: 330,borderRadius: 2,boxShadow: 2,overflow: 'hidden',bgcolor: 'background.paper',color: 'text.primary',transition: 'transform 0.2s ease-in-out','&:hover': {transform: 'scale(1.05)',},  }}>
      <div style={{ width: '100%', height: 220, backgroundColor: '#e3e2e2',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={image} alt={name} style={{maxWidth: '100%', maxHeight: '100%',objectFit: 'contain',mixBlendMode: 'multiply',}}/>
      </div>
      <CardContent sx={{ padding: '8px 16px' }}>
        <Typography variant='span' className='capitalize' noWrap>
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', padding: '8px 6px 0' }}>
        <IconButton  aria-label="edit" onClick={handleEditProduct} sx={{color: 'text.secondary','&:hover': {  color: 'primary.main',},}}>
          <MdEdit />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteProduct} sx={{color: 'text.secondary','&:hover': {  color: 'error.main',},}}>
          <MdDelete />
        </IconButton>
      </CardActions>
    </Card>   
  );
}

import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box, CircularProgress, Rating, Typography } from "@mui/material";
import CardElement from "@mui/material/Card";
import { useProductId } from "../store/productStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import summeryApi from "../api";
import { toast } from "react-toastify";
import { useCartItems } from "../store/cartStore";
import { SlHandbag } from "react-icons/sl";
import logoImgBlack from '../assets/LogoImgBlack.png'
import { useUserData } from "../store/userStore";
import { useOpenLogin } from "../store/generalStore";

const ProductCard = ({id,name,brand,discount,salePrice,offerPrice,image,stock}) => {
  
  const [active, setActive] = useState(false);
  const { setProductId } = useProductId();
  const navigate = useNavigate();
  const { setCartItems } = useCartItems();
  const [loading, setLoading] = useState(false)
  const {user} = useUserData()
  const {setOpenLogin} = useOpenLogin()


  const handleOnClick = (id) => {
    setProductId(id);
    navigate("/product-details");
  };

  const handleAddToCart = async (id, event) => {
    event.stopPropagation();
    try {
      if(!user) {
       return setOpenLogin()
      }
      setLoading(true)
      const response = await axios.post(
        summeryApi.addToCart.url,
        { product: id, qty: 1 },
        { withCredentials: true }
      );
      setLoading(false)
      if (response?.status === 200) {
        setCartItems();
        toast.success("Item added to cart");
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  };

  return (
    <CardElement onClick={() => handleOnClick(id)} sx={{ boxShadow: "none", borderRadius: "10px", transition: "transform 0.3s"}}className="rounded-lg lg:min-w-[200px] lg:max-w-[200px] min-w-[180px] max-w-[180px] border border-gray-200 dark:border-white dark:border-opacity-[0.1] cursor-pointer dark:bg-gray-800 hover:transform hover:scale-105">
      <Box onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} className="relative">
        <div className="relative" style={{width: "100%",height: 200,backgroundColor: "#e3e2e2",display: "flex",justifyContent: "center",alignItems: "center",}}>
          <img src={image || logoImgBlack} alt={name} style={{maxWidth: "100%",maxHeight: "100%",objectFit: "cover",mixBlendMode: "multiply",}}/>
            {loading && <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'center' }} className='bg-[#000000af] w-full h-full absolute'>
              <CircularProgress sx={{color:'yellow'}}/>
            </Box>}
            {stock == 0 && <Typography className="absolute bottom-1 px-1 rounded-sm left-1 !text-sm text-white font-bold bg-red-500">No Stock</Typography>}
            {stock < 5 && stock !=0 &&<Typography className="absolute bottom-1 px-1 rounded-sm left-1 !text-sm text-white font-bold bg-red-500">Only few left</Typography>}
        </div>
        {discount > 0 && (
          <Box className="absolute top-2 right-2 text-[13px] bg-[#269fb7d8] text-white p-[5px] rounded-lg">{discount}% OFF</Box>)}
        <Box className="card-body p-2 mt-2">
          <Typography className="dark:text-white truncate">{name}</Typography>
          <Typography variant="body2" className="text-slate-500 mb-1 capitalize">{brand}</Typography>
          <Box className="flex items-center gap-2">
            <Typography variant="body1" className="text-red-600 dark:text-white mr-2">₹ {offerPrice}</Typography>
            {discount && (
              <Typography variant="body2" className="text-slate-400 line-through">₹ {salePrice}</Typography>)}
          </Box>
          <Box>
            <Rating sx={{ color: "#269fb7", fontSize: "15px" }} name="read-only" value={4} readOnly/>
          </Box>
          {active && (
          <Tooltip title="Add to cart" arrow>
            <Box onClick={(event) => handleAddToCart(id, event)} className='hidden lg:block absolute right-2 bg-white p-2 rounded-full top-[155px] shadow-lg cursor-pointer'>
                <SlHandbag className="text-xl"  />
            </Box>
          </Tooltip>)}
          <Box onClick={(event) => handleAddToCart(id, event)} className='lg:hidden block absolute bottom-[125px] bg-white right-[10px] p-2 rounded-full'>
          <SlHandbag className="text-2xl"  />
          </Box>
        </Box>
      </Box>
    </CardElement>
  );
};

export default ProductCard;

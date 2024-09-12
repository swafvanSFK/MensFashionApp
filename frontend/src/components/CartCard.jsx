import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import summeryApi from "../api";
import { useCartItems } from "../store/cartStore";
import { useState } from "react";

const CartCard = ({ productName, image, price, id, qty }) => {

  const [loading, setLoading] = useState(false)

  const { setCartItems } = useCartItems();

  const handleDeleteItem = async () => {
    try {
      setLoading(true)
      const response = await axios.delete(summeryApi.removeCartItem.url + id, {
        withCredentials: true,
      });
      setLoading(false)
      if (response.status === 200) {
        setCartItems();
      }
    } catch (error) {
      console.log("Error removing cart item : ", error);
    }
  };

  return (
    <Card className="relative" sx={{width: "100%",borderRadius: "8px",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",transition: "transform 0.2s ease-in-out","&:hover": { transform: "translateY(-4px)",},}}>
      {loading && 
      <Box className='absolute h-full w-full   backdrop-brightness-[.3]'>
        <CircularProgress sx={{color:'yellow'}} className="absolute left-[200px] top-7 "/>
      </Box>}
      <CardContent className="dark:bg-gray-900" sx={{display: "flex",justifyContent: "space-between",alignItems: "center",padding: "16px",}}>
        <Box sx={{display: "flex",gap: "16px",alignItems: "center",cursor: "pointer",}}>
          <CardMedia sx={{height: 60,width: 60,borderRadius: "8px",backgroundSize: "cover",backgroundPosition: "center",}}image={image}/>
          <Stack className="dark:text-white">
            <Typography variant="subtitle1" sx={{fontWeight: 600,whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",maxWidth: "250px",}}>
              {productName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#d92929" }}>
             {qty} × ₹{price}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{display: "flex",flexDirection: "column",alignItems: "flex-end",gap: "10px",position: "relative", }}>
          <Stack sx={{display: "flex",alignItems: "center",cursor: "pointer",fontSize: "24px",}}>
            <AiOutlineDelete onClick={handleDeleteItem} className="hover:text-red-400 dark:text-white text-lg"/>
          </Stack>
        </Box>
      </CardContent>
      
    </Card>
  );
};

export default CartCard;

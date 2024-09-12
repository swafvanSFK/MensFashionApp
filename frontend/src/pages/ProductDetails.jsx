import { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, IconButton, Box, Divider, Rating, TextField,
} from "@mui/material";
import { MdAddShoppingCart } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import Navbar from "../components/Navbar";
import logoImgBlack from "../assets/LogoImgBlack.png";
import { useFetchAllReviews, useGetAllProducts, useGetProduct, useProductId} from "../store/productStore";
import axios from "axios";
import summeryApi from "../api";
import { toast } from "react-toastify";
import { useCartItems } from "../store/cartStore";
import Loading from "../components/Loading";
import MyButton from "../ui/MyButton";
import Card from "../components/Card";
import Footer from "../components/Footer";
import useDarkSide from "../hooks/darkSide";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import LoginPage from '../pages/LoginPage'
import { useUserData } from "../store/userStore";
import { useOpenLogin } from "../store/generalStore";


const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useProductId();
  const { getProduct, setGetProduct } = useGetProduct();
  const { setCartItems } = useCartItems();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(2);
  const { allProducts, setAllProducts } = useGetAllProducts();
  const [colorTheme] = useDarkSide();
  const [index, setIndex] = useState(0)
  const [review, setReview] = useState('')
  const {showReview,setShowReview} = useFetchAllReviews()
  const navigate = useNavigate()
  const {user} = useUserData()
  const {setOpenLogin} = useOpenLogin()

  useEffect(() => {
    try {
      setLoading(true);
      setAllProducts();
      setLoading(false);
    } catch (error) {
      console.log("Error fetching all products : ", error);
    }
  }, [setAllProducts]);

  const similiarProducts = allProducts.filter(
    (item) => item?.category === getProduct?.category
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if(!productId){
          navigate('/')
        }
        await setGetProduct(productId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [setGetProduct, navigate,productId]);

  useEffect(()=>{
    const fetchReviews = async()=>{
      setLoading(true)
      await setShowReview(getProduct?._id)
      setLoading(false)
    }
    fetchReviews()
  },[setShowReview,getProduct?._id])
  

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  

  const handleAddToCart = async (id) => {
    try {
      if(!user){
        return setOpenLogin()
      }
      const response = await axios.post(
        summeryApi.addToCart.url,
        { product: id, qty: quantity},
        { withCredentials: true }
      );
      if (response?.status === 200) {
        toast.success("Item added to cart");
        setCartItems();
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error adding to cart:", error.response.data.message);
    }
  };
  const customStyles = {
    "& .MuiInputLabel-root": { color: "#fff" },
    
  };

  const handleImage = (index) => {
    setIndex(index)
  }

  const handleReview = async () => {
    try {
      if(!user){
        return setOpenLogin()
      }
    const response = await axios.post(summeryApi.addReview.url,{
      productId : getProduct?._id,
      comment:review,
      rating : value
    },{withCredentials:true})
    if(response.data.success){
      toast.success("Review Added")
      setShowReview()
      setReview('')
    }
    console.log(response.data);
    } catch (error) {
      console.log("Error adding review : " ,error);
    }
  }
 
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box className="dark:bg-gray-700">
          <Navbar logo={logoImgBlack} textColor={"text-black"} dark="dark:bg-gray-900" fontColor={"black"} navBg={"bg-white"} borderColor={"border-black"}/>
          <Divider />
          <Container  sx={{ paddingY: 4 }}>
            <Box className="border" sx={{ padding: 3 }}>
              <Grid container spacing={4}>

                {/* Product Images */}
                <Grid item xs={12} md={6} className="flex justify-center gap-3">
                  <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center", }} >
                    <img className="rounded-lg min-w-[100px] max-w-[500px]" src={getProduct?.images[index]} alt="Product" style={{ borderRadius: "8px", minWidth: "100%",maxWidth:'100%' }} />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end", gap: 1, marginTop: 5, }} className='flex-col'>
                    {getProduct?.images?.map((item, index) => (
                      <img onMouseOver={()=>handleImage(index)} key={index} src={item} alt="Thumbnail 1" className="border rounded-md w-[70px] h-[70px] object-contain md:p-[5px] lg:p-[5px]" /> ))}
                  </Box>
                </Grid>

                {/* Product Information */}
                <Grid className="dark:text-white" item xs={12} md={6}>
                  <Typography className="!text-[20px] lg:!text-[40px]"  gutterBottom>
                    {getProduct?.productName}
                  </Typography>
                  <Typography className="!text-15px lg:!text-[25px]">{getProduct?.brand}</Typography>
                  {getProduct?.stock < 5 && getProduct.stock !=0 &&<Typography className="!text-10px lg:!text-[15px] text-pink-700 !font-bold">Only few left</Typography>}
                  <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }} >
                    <Typography variant="h5" className="text-[#269FB7]">
                      ₹{getProduct?.discountedPrice}
                    </Typography>
                    {getProduct?.discountPercentage && (
                      <Typography variant="body1" color="textSecondary" sx={{ marginLeft: 2, textDecoration: "line-through" }} >
                        ₹{getProduct?.price}
                      </Typography>)}
                  </Box>
                  {getProduct?.discountPercentage && (
                    <Typography variant="h5" color="red">
                      {getProduct?.discountPercentage}%
                    </Typography>)}
                  {getProduct?.stock == 0 ? 
                  <Typography sx={{ marginTop: 1, color: "red" }} variant="h6">
                    No Stock 🥺
                  </Typography> :
                  <Typography sx={{ marginTop: 1, color: "green" }} variant="h6">
                    In stock
                  </Typography> }
                  <Typography variant="body1" sx={{ marginTop: 3 }}>
                    Color:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                    <IconButton sx={{ backgroundColor: "#9c27b0", "&:hover": { backgroundColor: "#8e24aa" }, }}></IconButton>
                    <IconButton sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" }, }} ></IconButton>
                    <IconButton sx={{ backgroundColor: "#43a047", "&:hover": { backgroundColor: "#388e3c" } }} ></IconButton>
                    <IconButton sx={{ backgroundColor: "#ef5350", "&:hover": { backgroundColor: "#e53935" }, }}></IconButton>
                  </Box>

                  <Typography variant="body1" sx={{ marginTop: 3 }}>
                    Quantity:
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 1,}}>
                    <Button variant="outlined" onClick={handleDecrease}>-</Button>
                    <Typography variant="h6">{quantity}</Typography>
                    <Button variant="outlined" onClick={handleIncrease}>+</Button>
                  </Box>

                  <Typography variant="body1" sx={{ marginTop: 3 }}>Description:</Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 1,}}>{getProduct?.description}</Box>

                  <Box  className='flex flex-col md:flex-row lg:flex-row gap-2 mt-5'>
                    <Button onClick={()=>handleAddToCart(getProduct?._id)} sx={{ bgcolor: "#269FB7", color: "white" }} variant="contained" startIcon={<MdAddShoppingCart />}>Add to Cart</Button>
                    <Button variant="contained" color="secondary" startIcon={<GiShoppingBag />}>Buy Now</Button>
                  </Box>
                </Grid>
              </Grid>

              {/* Reviews Section */}
            </Box>
            {getProduct?.reviews?.length > 0 && <Box className='flex flex-col gap-2' sx={{marginTop:'40px'}}>
              <Typography variant="h5" marginBottom={2}>Reviews</Typography>
              {showReview?.reviews?.map((item, index) => (
                <Box key={index} className='border p-4'>
                  <Box className='flex items-center justify-between gap-2'>
                    <Typography sx={{fontSize:'25px'}} className="capitalize flex items-center gap-1"><CiUser className="text-secondary-color"/>{item.user.userName}</Typography>
                    <Rating readOnly name="read-only" value={item.rating} />
                  </Box>
                  <Typography>{item.comment}</Typography>
                </Box>
              ))}
            </Box>}
            <Box className='px-2'>
              <Box className="dark:text-white" sx={{ marginTop: 5 }}>
                <Typography variant="h6">Your Rating</Typography>
                <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
              </Box>
              <Box  className="dark:text-white" sx={{ marginTop: 3 }}>
                <Typography  mb={2} variant="h6">Your Comment</Typography>
                <TextField
                onChange={(e)=>setReview(e.target.value)}
                  sx={{...(colorTheme === "dark" ? customStyles : {}),"& .MuiOutlinedInput-root": {borderRadius: "0px","& fieldset": {borderColor: colorTheme === "dark" ? "#fff" : "#000",},"&:hover fieldset": {borderColor: colorTheme === "dark" ? "#ddd" : "#333",},"&.Mui-focused fieldset": {borderColor: colorTheme === "dark" ? "#aaa" : "#666"}},marginBottom: "10px",}} label="Comment" fullWidth multiline rows={5}/>
                <MyButton onClick={handleReview} $color="true">Add Review</MyButton>
              </Box>
              <Box className="dark:text-white" sx={{ marginTop: 3 }}>
                <Typography sx={{ fontSize: "25px", marginBottom: "20px" }}>Similiar products</Typography>
                <Grid container className="flex flex-col justify-center flex-wrap gap-2">
                  {similiarProducts.map((product, index) => (
                    <Grid key={index}>
                      <Card  image={product?.images[0]} name={product?.productName} brand={product?.brand} offerPrice={product?.discountedPrice} discount={product?.discountPercentage} salePrice={product?.price}/>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Container>
          <Footer />
          <LoginPage/>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;

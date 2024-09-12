import {Accordion,AccordionDetails,AccordionSummary,Box,Container,Divider,Grid,Stack,TextField,Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import logoImgBlack from "../assets/LogoImgBlack.png";
import Footer from "../components/Footer";
import { RiCoupon2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Fade from "@mui/material/Fade";
import MyButton from "../ui/MyButton";
import { useForm } from "react-hook-form";
import { useCartItems } from "../store/cartStore";
import axios from "axios";
import summeryApi from "../api";
import { useOrderId } from "../store/generalStore";

const Checkout = () => {
  const {cartTotal,cartItems,resetCartItems,setCartItems,cartId} = useCartItems()
  const { register, handleSubmit,setValue, formState: { errors } } = useForm();
  const [expanded, setExpanded] = useState(false);
  const {orderId,setOrderId} = useOrderId()
  const navigate = useNavigate()
  
  
  
  useEffect(()=>{
    setCartItems()
  },[setCartItems])

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };  

  const amount = cartTotal + 4

  setValue('itemsPrice',cartTotal)
  setValue('totalPrice',amount)

   const onSubmit = async (data,event) => {
    try {
        const response = await axios.post(summeryApi.payment.url,{amount},{withCredentials:true})
        setOrderId(response?.data?.data?.id)
        const orderData = {
          ...data,
          orderItems : cartItems,
          orderId : orderId
        }
        const order = response?.data?.data
        const option = {
          key : import.meta.env.RAZORPAY_KEY,
          amount : order.amount,
          currency : order.currency,
          name : "Men's fashion",
          description : "Transaction",
          image : logoImgBlack,
          order_id : order.id,
          handler : async function (response) {
            const body = {...response}

           const verifyResponse = await axios.post(
              summeryApi.verifyPayment.url,
              body,
            );
            console.log();
            if(verifyResponse?.data?.success){
              
          try {
            const responsedata = await axios.post(summeryApi.newOrder.url,orderData,{withCredentials:true})
            if(responsedata.data.success){
              try {
                const response =  await axios.delete(summeryApi.clearAllCartItems.url+cartId)  
                console.log(response.data);
                if(response?.data?.success){
                  resetCartItems()
                  navigate('/success-order')
                }
              } catch (error) {
                console.log("Error clearing cart :",error);
              }
            }
          } catch (error) {
            console.log("Error creating new order : ", error);
          }
            }
            
          },

          prefill : {
            name : "Men's fashion",
            email : "safuSwafvan1@gmail.com",
            contact : "0000000",
          },
          notes : {
            address: "Razorpay Corporate Office",
          },
          theme : {
            color: "#269FB7",
          },
        }

        const rzp1 = new window.Razorpay(option);

        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
        });
        rzp1.open();
        event.preventDefault();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box className='dark:bg-gray-700'>
      <Navbar logo={logoImgBlack} textColor={"text-black"} dark="dark:bg-gray-900" borderColor={"border-black"} fontColor={"black"}/>
      <Divider/>
      <Container className="my-10 ">
        <Box>
          <Typography className="dark:text-white" sx={{ fontSize: "30px", paddingBottom: "10px", borderBottom: "5px solid #269fb7",}}> Checkout</Typography>
          <Accordion className="dark:bg-gray-900 mt-5" style={{ boxShadow: "none" }} expanded={expanded} onChange={handleExpansion} slots={{ transition: Fade }} slotProps={{ transition: { timeout: 400 } }} sx={{"& .MuiAccordion-region": { height: expanded ? "auto" : 0 },"& .MuiAccordionDetails-root": {display: expanded ? "block" : "none",},}}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Box className="text-3xl mt-5 flex items-center gap-3">
                <RiCoupon2Line className="text-secondary-color" />
                <Typography className="dark:text-white" sx={{ fontSize: "18px" }}>Have a coupon?<Link className="text-secondary-color hover:underline dark:text-white">Click here to enter your code</Link></Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails className="dark:bg-gray-900">
              <Box className='dark:bg-gray-900'>
                <Typography className="dark:bg-gray-900 dark:text-white"> If you have a coupon code, please apply it below. </Typography>
                <Box className="flex items-center gap-2 dark:bg-gray-900 dark:text-white">
                  <TextField size="small" sx={{ width: "300px" }} margin="normal" label="Coupon code" autoComplete="CouponCode"/>
                  <MyButton $color="true">Apply coupon</MyButton>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Grid container component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Grid lg={7} xs={12} md={7}item>
              <Typography className="dark:text-white" sx={{ fontSize: "32px", fontWeight: "bold", marginTop: "50px", marginBottom: "10px",}}>Billing details</Typography>
              <Divider sx={{ marginBottom: "20px" }} className="dark:bg-white" />
              <Stack>
                <TextField {...register("address",{required:true})}  error={!!errors.address} helperText={errors.address && 'Shipping address is required!.'} type='text' sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0px"}}}  label="Shipping Address*" fullWidth multiline rows={5}/>
                <TextField {...register("city",{required:true})}  error={!!errors.city} helperText={errors.city && 'City is required!.'} type='text' sx={{"& .MuiOutlinedInput-root": {borderRadius: "0px"}}} margin="normal"  fullWidth label="Town/City*" autoComplete="shippingAddress"/>
                <TextField {...register("country",{required:true})}  error={!!errors.country} helperText={errors.country && 'Country is required!.'} type='text' sx={{ "& .MuiOutlinedInput-root": {borderRadius: "0px",}}} margin="normal"  fullWidth label="Country*" autoComplete="shippingAddress"/>
                <TextField {...register("postalCode",{required:true})} error={!!errors.postalCode} helperText={errors.postalCode && 'Postal code is required!.'}  type='number' sx={{ "& .MuiOutlinedInput-root": {borderRadius: "0px"}}} margin="normal"  fullWidth label="PostalCode*" autoComplete="shippingAddress"/>
                <TextField {...register("email",{required:true})}  error={!!errors.email} helperText={errors.email && 'Email required!.'} type='email' sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0px"}}} margin="normal"  fullWidth label="Email*" autoComplete="shippingAddress"/>
              </Stack>
            </Grid>
            <Grid lg={4} xs={12} item className="!mt-[50px] md:!mt-[50px] lg:!mt-[50px] lg:!ml-[50px]">
              <Box className="p-6 max-w-md mx-auto border dark:text-white">
                <Typography sx={{marginBottom:'10px'}} variant="h6">
                  Your order
                </Typography>
                <Box className="mb-4">
                  <Box className="flex justify-between  border-b p-4">
                    <Typography className="font-semibold">Product</Typography>
                    <Typography className="font-semibold">Subtotal</Typography>
                  </Box>
                  <Box className="flex justify-between font-semibold border-b p-4">
                    <Typography>Subtotal</Typography>
                    <Typography>₹{cartTotal}</Typography>
                    <input type="hidden" {...register('itemsPrice')} />
                  </Box>
                  <Box className="flex justify-between font-semibold border-b p-4">
                    <Typography>GST/Tax</Typography>
                    <Typography>₹4.6</Typography>
                  </Box>
                  <Box className="flex justify-between font-semibold border-b p-4">
                    <Typography>Shipping</Typography>
                    <Typography sx={{color:'red'}}>Free</Typography>
                  </Box>
                  <Box className="flex justify-between font-semibold border-b p-4">
                    <Typography>Total</Typography>
                    <Typography>₹{amount}</Typography>
                    <input type="hidden" {...register('totalPrice')} />
                  </Box>
                </Box>
                <MyButton type="submit" style={{letterSpacing:'3px'}} $color='true' className="w-full">Place Order</MyButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Checkout;

import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import logoImgBlack from '../assets/LogoImgBlack.png';
import { Box, Container, Divider,Typography } from "@mui/material";
import Footer from "../components/Footer";
import { useCartItems } from '../store/cartStore';
import Loading from '../components/Loading'
import { useOrderId } from '../store/generalStore';

const OrderSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const {setCartItems} = useCartItems()
  const {orderId} = useOrderId()
  
  useEffect(()=>{
    setCartItems()
  },[setCartItems])

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div>
      {!orderId ? <Loading/> :
       <Box>
       <Navbar logo={logoImgBlack} textColor={"text-black"} dark="dark:bg-gray-900" borderColor={"border-black"} fontColor={"black"} />
         <Divider />
 
         <Container>
           <Box className="mb-6 h-[calc(100vh-(152px+350px))] flex flex-col gap-2 items-center justify-center">
             <Typography className='text-center'>Order Id : <span className='py-2 px-5 bg-gray-200 text-secondary-color font-bold rounded-full'>{orderId}</span></Typography>
             <Typography style={{fontSize:'30px'}}>
               Thank you. Your order has been received <span className="animate-flower text-flower-pink">🎉</span>.
             </Typography>
           </Box>
         </Container>
         <Footer />
         {showConfetti && (
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {Array.from({ length: 30 }).map((_, i) => (
             <span
               key={i}
               className="animate-fall absolute text-4xl"
               style={{
                 left: `${Math.random() * 100}vw`,
                 animationDelay: `${Math.random() * 1}s`,
               }}
             >
               🎉
             </span>
           ))}
         </div>
       )}
      </Box>
      }
     
    </div>
  );
};

export default OrderSuccess;

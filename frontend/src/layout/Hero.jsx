import MyButton from "../ui/MyButton";
import { useOpenLogin, useOpenSignUp } from "../store/generalStore";
import LoginForm from "../pages/LoginPage";
import SignUpForm from "../pages/SignUpPage";
import { useUserData } from "../store/userStore";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Hero = () => {

  const {openLogin,setOpenLogin} = useOpenLogin()
  const {openSignUp,setOpenSignUp} = useOpenSignUp()
  const {user} = useUserData()

  return (
    <section
      id="hero-section"
      className=" flex lg:items-center lg:px-48 px-5 lg:justify-start justify-center text-white"
    >
      <Box className="flex flex-col lg:gap-0 gap-5 justify-center lg:text-start text-center mt-20">
        <p data-aos="fade-left" className="capitalize lg:text-xl md:text-[50px]">A whole New look</p>
        <Box className="leading-tight lg:text-start  lg:block sm:flex md:flex md:flex-col gap-2 md:gap-0 justify-center items-center">
          <h1 data-aos="fade-left" className="lg:text-[90px] md:text-[150px] text-[40px] capitalize font-medium ">
            beauty
          </h1>
          <h1 data-aos="fade-right" className="lg:text-[90px] md:text-[150px] text-[40px] capitalize font-medium ">
            pronounsed
          </h1>
        </Box>
        <Box className=" flex flex-col lg:items-start md:items-center gap-6">
          <Typography sx={{letterSpacing:'0.7px'}} data-aos="zoom-out" className="max-w-[600px] lg:text-start">
            Explore timeless elegance and modern trends in men&apos;s fashion.
            Discover curated collections of premium apparel and accessories.Find
            the perfect pieces to express your unique personality and
            sophistication.
          </Typography>
          {
            user ? <Box><Link to={'/shop'}><MyButton data-aos="zoom-out" $primary='true'>Shop Now</MyButton></Link></Box>  : (
              <Box className="flex lg:justify-start justify-center gap-5 ">
                <MyButton data-aos="zoom-out" onClick={setOpenLogin} $primary='true'>Login</MyButton>
                <MyButton data-aos="zoom-out" onClick={setOpenSignUp} $primary='true'>Sign up</MyButton>
              </Box>
            )
          }
        </Box>
      </Box>
      {
        openLogin && <LoginForm/>
      }
      {
        openSignUp &&  <SignUpForm/>
      }
    </section>
  );
};

export default Hero;

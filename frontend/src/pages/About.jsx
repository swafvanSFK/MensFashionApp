import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import BrandCarousal from "../components/BrandCarousal";
import Footer from "../components/Footer";
import logoImgWhite from "../assets/logoImgWhite.png";
import { IoMdArrowDropright } from "react-icons/io";
import ourFeatures from "../data/ourFeatures";
import aboutImg from "../assets/about-img.jpg";
import OurServices from "../components/OurServices";
import { Box, Typography } from "@mui/material";
import useDarkSide from "../hooks/darkSide";

const About = () => {

  const [colorTheme] = useDarkSide();

  return (
    <Box className="dark:bg-gray-800">
      <Box
        id={colorTheme === 'dark'?'':"about-header-bg"}
        className="h-52 md:h-52 lg:h-96 flex flex-col justify-between pb-10 dark:bg-gray-900"
      >
        <Box >
          <Navbar
            logo={logoImgWhite}
            textColor={"text-white"}
            borderColor={"border-black"}
            smTextColor={"text-black"}
          />
        </Box>
        <Box data-aos="zoom-in">
          <Typography className="!text-[50px] md:!text-[50px] lg:!text-[90px] text-white text-center font-medium">
            About
          </Typography>
        </Box>
      </Box>
      <Box id={colorTheme === "dark" ? '' : "about"} className='dark:bg-gray-800'>
        <Box className="flex lg:flex-row flex-col justify-evenly lg:pt-32 pt-10">
          <Box className="flex flex-col lg:w-1/2 lg:p-0 p-4 gap-10 lg:h-screen">
            <Box data-aos="zoom-out" className="flex flex-col  lg:items-start justify-center gap-4 dark:text-white">
              <Typography variant="p" className="text-secondary-color text-lg lg:text-start ">
                Helping You Look Good
              </Typography>
              <Typography variant="h1" sx={{fontSize:'30px'}} className="text-3xl dark:text-white font-medium lg:text-start ">
                Beauty&apos;s Enchancment
              </Typography>
              <Typography variant="p" className="max-w-[550px] font-medium text-gray-700 dark:text-white">
                Discover our men&apos;s clothing eCommerce website, featuring a
                vast selection of high-quality apparel, from casual to formal
                wear, designed to keep you stylish and comfortable. Enjoy a
                seamless shopping experience with our user-friendly interface,
                advanced search options, secure checkout, and exceptional
                customer service.
              </Typography>
              <Typography variant="p" className="max-w-[550px] font-medium text-gray-700 dark:text-white">
                Explore our men&apos;s clothing eCommerce site for premium
                apparel, including casual and formal wear, all with a
                user-friendly shopping experience and secure checkout.
              </Typography>
            </Box>
            <Box className="max-w-[600px] flex flex-col gap-4">
              <Typography variant="h3" sx={{fontSize:'18px',lineHeight:'28px'}} data-aos="zoom-out" className="text-secondary-color text-lg ">Our Features</Typography>
              <ul className="grid md:grid-cols-2 lg:grid-cols-2 font-medium text-gray-700">
                {ourFeatures.map((features, index) => (
                  <li
                    data-aos="zoom-out"
                    key={index}
                    className="flex items-center text-secondary-color "
                  >
                    <IoMdArrowDropright className="lg:text-4xl text-3xl" />
                    <span className="text-gray-700 dark:text-white">{features}</span>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Box data-aos="fade-left" className="mt-5 lg:mt-0">
            <img className="lg:w-[400px] w-full" src={aboutImg} alt="" />
          </Box>
        </Box>
      </Box>
      <Box className='dark:bg-gray-900'>
        <Box>
        <Banner/>
        </Box>
        <OurServices />
        <Box className='mb-16 md:mb-32 lg:mb-0'>
        <BrandCarousal />
        </Box>
        {/* <Divider className="hidden dark:block dark:bg-white"/> */}
        <Footer />
      </Box>
    </Box>
  );
};

export default About;

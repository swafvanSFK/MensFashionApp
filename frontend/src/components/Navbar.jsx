import MyButton from "../ui/MyButton";
import navLinks from "../data/navLinks";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Box, Menu, MenuItem } from "@mui/material";
import { useOpenCartDrawer } from "../store/generalStore";
import CartDrawer from "./CartDrawer";
import axios from "axios";
import summeryApi from "../api";
import { toast } from "react-toastify";
import SwicthDark from "../components/SwicthDark";
import useDarkSide from "../hooks/darkSide";
import whiteLogo from "../assets/logoImgWhite.png";
import { useUserData } from "../store/userStore";
import { useCartItems } from "../store/cartStore";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";



const Navbar = ({logo,textColor,dark,fontColor}) => {
  
  const [openNav, setOpenNav] = useState(false);
  const {user,clearUser} = useUserData()  
  const navigate = useNavigate()
  const { openCartDrawer, setOpenCartDrawer } = useOpenCartDrawer();
  const [colorTheme] = useDarkSide();
  const {cartCount,setCartItems} = useCartItems()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    setCartItems()
  },[setCartItems,cartCount])

  const toggleScroll = (event) => {
    setAnchorEl(event.currentTarget);
    if (openNav) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
    setOpenNav(!openNav);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(summeryApi.logOut.url, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/')
        clearUser()
      }
      if (res.data.error) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <nav className={ ` my-container ${dark} `}>
      <div className="flex items-center justify-center py-5">
        <div className={`flex flex-col ${textColor} items-center justify-center gap-9`}>
          <div className="flex justify-center items-center dark:text-white">
            {/* Logo Image */}
            {colorTheme === "dark" ? (
              <img src={whiteLogo} alt="Logo" className="lg:w-[200px] md:w-[200px] min-w-[130px]"
              />
            ) : (
              <img src={logo} alt="Logo" className="lg:w-[200px] md:w-[200px] min-w-[130px]"/>
            )}

            {/* Navbar Toggle Icon */}
            <Box className='absolute left-0 lg:pl-10 pr-2 flex gap-2'>
              <div onClick={toggleScroll} className="lg:hidden block pl-2 text-3xl dark:text-white"  id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                <CiMenuKebab className="text-2xl lg:text-3xl md:text-4xl"/>
              </div>
              <div>
                <SwicthDark className='text-4xl'/>
              </div>
            </Box>

            {/* Navbar for small devices */}
            {openNav && (
              <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}}>
                  {navLinks.map((link, index) =>(
                    <MenuItem sx={{padding:'0px'}} key={index}><Link style={{padding:'10px 20px',width:'100%'}} to={link.path} onClick={toggleScroll}>{link.name}</Link></MenuItem>
                  ))}
              </Menu>
            )}
            {/* Navbar Icons */}

            {/* Show when user Logined */}
            {
              user &&
              <div className="lg:pr-10 pr-2 flex justify-center items-center absolute right-0  text-2xl lg:gap-8 gap-4">
                <div className="flex lg:gap-6 gap-3 justify-center items-center ">
                  {/* Show only admin */}
                  {
                    <Link to={user.role ==="ADMIN" ? "/admin-panel" : "/user-profile"}>
                      <CiUser className="cursor-pointer hidden lg:block text-[30px]" />
                    </Link>
                  }
                  <Badge onClick={setOpenCartDrawer} badgeContent={cartCount} color="secondary">
                    <CiShoppingCart className="cursor-pointer lg:text-[30px]  md:text-4xl" />
                  </Badge>
                  <div onClick={handleLogout} className="lg:hidden lg:text-3xl md:text-4xl">
                    <CiLogout/>
                  </div>
                  <MyButton style={{color:fontColor}} onClick={handleLogout} $outlined="true" className="lg:block hidden bg-red-300 dark:text-white">
                    Logout
                  </MyButton>
                </div>
              </div>
            }
          </div>
          
          {/* Navbar for big devices */}
          <div>
            <ul className={`${textColor} lg:flex hidden gap-8 justify-center items-center uppercase font-medium dark:text-white`}>
              {navLinks.map((link, index) => (
                <Link className="cursor-pointer scale-95 hover:scale-105 hover:block transition-all" key={index} to={link.path}>
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {openCartDrawer && <CartDrawer />}
    </nav>
  );
};

export default Navbar;

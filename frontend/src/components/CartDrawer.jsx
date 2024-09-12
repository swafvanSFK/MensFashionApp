import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useOpenCartDrawer } from "../store/generalStore";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";
import MyButton from "../ui/MyButton";
import CartCard from "./CartCard";
import { useEffect } from "react";
import { useCartItems } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { openCartDrawer, setOpenCartDrawer } = useOpenCartDrawer();
  const { cartItems, setCartItems,setCartTotal, cartTotal } = useCartItems();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      await setCartItems();
    };
    fetchCartItems();
  }, [setCartItems]);

  useEffect(()=>{
    setCartTotal(cartItems)
  },[setCartTotal,cartItems])

  const openCartPage = () => {
    navigate('/cart')
    setOpenCartDrawer()
  }

  const openCheckoutPage = () => {
    navigate('/checkout')
    setOpenCartDrawer()
  }

  return (
    <>
      <Drawer open={openCartDrawer} onClose={setOpenCartDrawer} anchor="right">
        <Box className="dark:bg-gray-800 h-full w-[395px] md:w-[500px] lg:w-[500px] p-3" role="presentation">
          <List sx={{ p: "10px" }}>
            <Stack sx={{ position: "relative" }}>
              <Stack spacing={2}>
                <Typography className="text-center dark:text-white" variant="h6" color="initial">
                  MY CART {cartItems.length > 0 ? `( ${cartItems.length} )` : ''}
                </Typography>
                <Typography className="dark:text-white" align={"center"} variant="body1" component="p" gutterBottom>
                  Enjoy exclusive deals on your selected items!🎉.
                </Typography>
              </Stack>

              <IconButton onClick={setOpenCartDrawer} aria-label="close" className="dark:text-white" sx={{ position: "absolute", right: 0, top: -2, color: (theme) => theme.palette.grey[500],}}>
                <IoMdClose />
              </IconButton>
            </Stack>
          </List>
          <Divider className="dark:bg-white"/>
          {cartItems.length === 0 ? (
            <Typography className="flex items-center justify-center">No products in the cart</Typography>
          ) : (
            <Box>
              <List>
                <ListItem
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  {cartItems?.map((item, index) => (
                    <CartCard
                      key={index}
                      id={item.product._id}
                      productName={item?.product?.productName}
                      price={item?.product?.price}
                      qty={item?.qty}
                      image={item?.product?.images[0]}
                    />
                  ))}
                </ListItem>
              </List>
              <Divider className="dark:bg-white" sx={{ marginBottom: "20px" }} />
              <Box className="flex flex-row justify-between">
              <Typography marginBottom={2} className="pl-4 dark:text-white">
                SUBTOTAL :
              </Typography>
                <Typography  className="font-bold pr-4 dark:text-white">
                  ₹ {cartTotal}.00
                </Typography>
              </Box>
              <Divider className="dark:bg-white" sx={{ marginBottom: "20px" }} />
              <Stack onClick={openCartPage} className="flex mb-2">
                <MyButton  $color="true">View cart</MyButton>
              </Stack>
              <Stack onClick={openCheckoutPage} className="flex mb-2">
                <MyButton $color="true">Check out</MyButton>
              </Stack>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}

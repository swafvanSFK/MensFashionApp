import { Box, Container, Table, TableCell, tableCellClasses, TableContainer, TableHead, TableBody, TableRow, Typography, IconButton, TextField, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logoImgBlack from "../assets/LogoImgBlack.png";
import MyButton from "../ui/MyButton";
import { useEffect } from "react";
import { useCartItems } from "../store/cartStore";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import summeryApi from "../api";
import { useUserData } from "../store/userStore";


const ViewCart = () => {
  const { cartItems, setCartItems, cartTotal, setCartTotal } = useCartItems();
  const navigate = useNavigate()  
  const {user} = useUserData()

  const userId = user?._id

  useEffect(() => {
    setCartItems();
  }, [setCartItems]);

  useEffect(() => {
    setCartTotal(cartItems)
  }, [setCartTotal, cartItems]);  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.black,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(summeryApi.removeCartItem.url + id, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setCartItems();
      }
    } catch (error) {
      console.log("Error removing cart item: ", error);
    }
  };

  const handleQuantityChange = async (id, newQty) => {
    try {
      const response = await axios.put(summeryApi.editCart.url, {
        userId,
        productId: id,
        newQty,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
       await setCartItems();
      }
    } catch (error) {
      console.log("Error updating cart item quantity: ", error);
    }
  };

  const openCheckoutPage = () => {
    navigate('/checkout');
  };


  return (
    <Box className='dark:bg-gray-700'>
      <Navbar logo={logoImgBlack} textColor={"text-black"} dark="dark:bg-gray-900" fontColor={"black"} navBg={"bg-white"} borderColor={"border-black"} />
      <Divider className="dark:bg-white"/>
      {cartItems.length === 0 ? 
        <Typography className="flex items-center justify-center h-screen dark:text-white">No products in the cart</Typography> :
        <Container sx={{ marginY: "80px" }}>
          <Typography className="dark:text-white" sx={{ fontSize: "35px", marginBottom: "20px", display: 'flex', alignItems: "center" }} variant="body1" color="initial">
            <CiShoppingCart className="inline-block mr-2 text-secondary-color" />Cart
          </Typography>
            <TableContainer className="border-[#6b6b6b27] dark:border-white border border-b-0">
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="dark:!text-white">Remove</StyledTableCell>
                    <StyledTableCell className="dark:!text-white">Image</StyledTableCell>
                    <StyledTableCell className="dark:!text-white">Product Name</StyledTableCell>
                    <StyledTableCell className="dark:!text-white">Price</StyledTableCell>
                    <StyledTableCell className="dark:!text-white">Quantity</StyledTableCell>
                    <StyledTableCell className="dark:!text-white">Subtotal</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <StyledTableCell >
                        <IconButton onClick={() => handleDeleteItem(item.product._id)} aria-label="delete">
                          <IoIosCloseCircleOutline className="dark:text-white"/>
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box display="flex" alignItems="center">
                          <img
                            src={item?.product?.images[0]}
                            style={{ width: "50px", marginRight: "10px" }}
                          />
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography  sx={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px", }} className="text-secondary-color dark:text-white">
                          {item?.product?.productName}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell className="dark:!text-white">₹{item?.product?.price}</StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          type="number"
                          defaultValue={item.qty}
                          size="small"
                          sx={{ width: "60px", "& .MuiOutlinedInput-root": { borderRadius: "0px", }, }}
                          onChange={(e) => handleQuantityChange(item?.product?._id, e.target.value)}
                        />
                      </StyledTableCell>
                      <StyledTableCell className="dark:!text-white">
                        ₹{item?.product?.price * item?.qty}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Box display="flex" alignItems="center">
                <TextField label="Coupon code" variant="outlined" size="small" sx={{ marginRight: "10px", "& .MuiOutlinedInput-root": { borderRadius: "0px", } }} />
                <MyButton $color="true">Apply Coupon</MyButton>
              </Box>
            </Box>
          <Box className="flex justify-end mt-16 ">
            <TableContainer sx={{ maxWidth: 500 }} className="border-[#6b6b6b27] dark:border-white border">
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="dark:!text-white">Cart totals</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell className="dark:!text-white">Total</StyledTableCell>
                    <TableCell className="dark:!text-white" sx={{ fontWeight: 'bold' }}>
                      ₹{cartTotal}.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box onClick={openCheckoutPage} className="p-3">
                <MyButton $color="true" className="w-full h-12">
                  Proceed to checkout
                </MyButton>
              </Box>
            </TableContainer>
          </Box>
        </Container>
      }
      <Footer />
    </Box>
  );
};

export default ViewCart;

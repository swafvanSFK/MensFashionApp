import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import MyButton from '../ui/MyButton'
import { useEffect, useState } from "react";
import summeryApi from "../api";
import axios from 'axios'
import moment from 'moment';
import {toast} from 'react-toastify'

const UserOrders = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)


   const fetchUserOrders = async () => {
    try {
      const response = await axios.get(summeryApi.loggedUserOrders.url,{withCredentials : true})
      setOrders(response.data)
    } catch (error) {
      console.log("Error fecthing user orders : ", error);
    }
   }

   useEffect(()=>{
    fetchUserOrders()
   },[])

   console.log(orders);
   
  
  const handleCancelOrder = async (id) => {
    setLoading(true)
    const response = await axios.get(summeryApi.orderToCancel.url+id,{withCredentials:true})
    setLoading(false)
    if(response.data.success){
      toast.success(response.data.message)
      fetchUserOrders()
    }
  }

  return (
    <>
        <Box className="bg-gray-100 min-h-screen p-6">
          <Box>
            <Box>
              <Typography className="!text-[40px] font-thin text-secondary-color" gutterBottom>
                {orders.length === 0 ? "No orders found" : "My orders"}
              </Typography>
              <Typography className="text-gray-600 mb-4 !text-lg !font-medium">
                View and edit all your pending, delivered, and returned orders here.
              </Typography>
            </Box>
            {orders?.map((item,index)=>(
            <Card key={index} className="my-4 shadow-md">
              <CardContent className="p-4">
                <Box className="flex justify-end">
                  <MyButton $color='true'>
                    Track Order
                  </MyButton>
                </Box>
                <Box className="flex gap-2 items-center">
                  <Typography className="flex gap-2 text-gray-700 px-2 py-2 bg-gray-200 rounded-full">
                    Order ID : 
                    <span className="text-secondary-color font-bold">{item?.paymentResult?.id}</span>
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    Order Shipped: {moment(new Date(item?.paymentResult?.updateTime).toISOString()).format('ddd, Do MMM YY')}
                  </Typography>
                </Box>
              </CardContent>
              {item?.orderItems?.map((product, index) => (
                <CardContent key={index} className="p-4">
                  <Box className="flex justify-between items-center">
                    <Box className="flex">
                      <img src={product?.product?.images[0]} alt="Product" className="rounded-md w-16 h-16 object-contain mr-4"/>
                      <Box>
                        <Typography variant="body1" className="max-w-[150px] min-w-[150px] truncate">
                          {product?.product?.productName}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                          Brand: {product?.product?.brand}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                            Qty: {product?.qty}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                    <Box >
                        <span>Status</span>
                        <Typography   className={`!text-xl ${item.orderStatus === 'Canceled' ? 'text-red-600' : 
                          item.orderStatus === 'Shipped' ? ' text-orange-500' : ' text-red-900'}`}>{item?.orderStatus}</Typography>
                      </Box>
                    </Box>
                    <Box className="text-right">
                      <Typography variant="body1">Rs. ₹{product?.product?.discountedPrice * product?.qty}</Typography>
                      <Typography variant="body2" className="text-gray-500">
                        Delivery Expected after 7 working days from your order
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              ))}
              <Box className="p-4 border-t border-gray-200 flex justify-between items-center">
                <MyButton disabled={item.orderStatus==='Canceled' ? true : false} onClick={()=>handleCancelOrder(item._id)} $color="true" className="text-gray-500 flex items-center justify-center min-w-[150px]">
                  {loading ? <CircularProgress sx={{color : "yellow"}} size={20}/> : "Cancel order" && item.orderStatus === 'Canceled' ? "Canceled" : "Cancel order"}
                </MyButton>
                <Typography variant="h6">Total : ₹ {item?.totalPrice}</Typography>
              </Box>
            </Card>
            ))}
          </Box>
        </Box>
    </>
  );
};

export default UserOrders;

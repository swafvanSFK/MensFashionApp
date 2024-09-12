import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import summeryApi from '../api';
import axios from 'axios'
import moment from 'moment';

const AdminOrderPage = () => {

    const [allOrders, setAllOrders] = useState([])

    useEffect(()=>{
        const fetchAllOrders = async () => {
            try {
                const response = await axios.get(summeryApi.getAllOrders.url)
                setAllOrders(response.data)
                
            } catch (error) {
                console.log("Error fetching all orders : ",error);
            }
        }
        fetchAllOrders()
    },[])

    console.log(allOrders);

  return (
    <div>
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders <span className="text-sm text-gray-600">(15 Orders found)</span></h1>

      <Box aria-label="Medium-sized button group"  className="mb-4 flex gap-10">
        <Typography className='cursor-pointer border-b-4 border-b-[#269FB7]'>All orders</Typography>
        <Typography className='cursor-pointer border-b-4 border-transparent hover:border-b-[#269FB7]'>Completed</Typography>
        <Typography className='cursor-pointer border-b-4 border-transparent hover:border-b-[#269FB7]'>Pending</Typography>
        <Typography className='cursor-pointer border-b-4 border-transparent hover:border-b-[#269FB7]'>Canceled</Typography>
      </Box>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left py-2 px-4">#</th>
            <th className="text-left py-2 px-4">Order ID</th>
            <th className="text-left py-2 px-4">Qty</th>
            <th className="text-left py-2 px-4">Address</th>
            <th className="text-left py-2 px-4">Date</th>
            <th className="text-left py-2 px-4">Price</th>
            <th className="text-left py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{order?.paymentResult?.id}</td>
              <td className="py-2 px-4 ">{order?.orderItems?.length}</td>
              <td className="py-2 px-4 max-w-[100px] truncate">{order?.shippingAddress?.address}</td>
              <td className="py-2 px-4">{moment(order?.paidAt).format('ddd, Do MMM YY')}</td>
              <td className="py-2 px-4">₹{order.totalPrice}</td>
              <td className="py-2 px-4">
                <span className={`py-1 px-3 rounded-full text-sm 
                  ${order.orderStatus === 'Complete' ? 'bg-green-100 text-green-700' : 
                  order.orderStatus === 'Shipped' ? 'bg-red-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {order.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  )
}

export default AdminOrderPage
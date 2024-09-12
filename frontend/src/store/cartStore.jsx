import axios from 'axios';
import {create} from 'zustand'
import summeryApi from '../api';


const useCartItems = create ((set) => ({
    cartItems : [],
    cartCount:0,
    cartTotal : 0,
    cartId : null,
    setCartItems : async () => {
        try {
            const response = await axios.get(summeryApi.getCartItems.url,{withCredentials:true})
            set({cartItems : response?.data?.cartItems})
            set({cartCount : response?.data?.cartItems?.length})
            set({cartId : response?.data?._id})            
        } catch (error) {
            console.log("Error fetching cartItems : ", error);
        }
    },
    resetCartItems : () =>{
        set({cartItems : []})
        set({cartCount:0})  
    },
    setCartTotal : (items)=>{
        const productPrices=items.map((item) => item?.product?.price * item?.qty)
        set({cartTotal:productPrices?.reduce((acc, value) => acc + value, 0)})
    },
}))

export {useCartItems}
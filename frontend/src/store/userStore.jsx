import axios from "axios";
import { create } from "zustand";
import summeryApi from "../api";

const useChangeUserRole = create((set) => ({
    openChangeRole: false,
    setOpenChangeRole: () => set((state) => ({ openChangeRole: !state.openChangeRole })),
  }));

  const useUserData = create((set) => ({
    user: null,
    setUser: async () => {
      try {
        const response = await axios.get(summeryApi.getUser.url,{withCredentials:true})
        set({user : response?.data?.data})
      } catch (error) {
        console.log(error);
      }
    },
    clearUser : ()=>{
      set({user : null})
    }
  }));


const useGetAllUsers = create((set) => ({
  allUsers : [],
  setAllUsers : async () => {
    try {
      const response = await axios.get(summeryApi.getAllUsers.url,{withCredentials : true})
      set({allUsers : response?.data?.data})
    } catch (error) {
      console.log("Error fetching All Users : ", error);
      
    }
  }
}))

const useGetUserById = create((set) => ({
  currentUser : [],
  setCurrentUser : async (id) => {    
    try {      
      const response = await axios.get(summeryApi.currentUser.url+id,{withCredentials : true})
      set({currentUser : response?.data?.byId})      
    } catch (error) {
      console.log("Error fetching user by Id : ", error);
    }
  }
}))
export {useChangeUserRole,useUserData,useGetAllUsers,useGetUserById}
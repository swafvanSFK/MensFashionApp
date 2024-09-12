import {create} from 'zustand'

const useOpenCartDrawer = create((set) => ({
    openCartDrawer : false,
    setOpenCartDrawer : () => set((state) => ({openCartDrawer : !state.openCartDrawer}))
}))

const useOpenLogin = create((set) => ({
    openLogin : false,
    setOpenLogin : () => set((state) => ({openLogin : !state.openLogin}))
}))

const useOpenSignUp = create((set) => ({
    openSignUp : false,
    setOpenSignUp : () => set((state) => ({openSignUp : !state.openSignUp}))
}))

const useOpenCategory = create((set) => ({
    openCategory : false,
    setOpenCategory : () => set((state) => ({openCategory : !state.openCategory}))
}))

const useOpenTrackOrder = create((set) => ({
    openTrackOrder : false,
    setOpenTrackOrder : () => set((state) => ({openTrackOrder : !state.openTrackOrder}))
}))

const useOpenForgotPassword = create((set) => ({
    openForgotPassword : false,
    setOpenForgotPassword : () => set((state) => ({openForgotPassword : !state.openForgotPassword}))
}))

const useTheme = create((set) => ({
    theme: localStorage.getItem("theme") || "light",
    setTheme: (newTheme) => {
      set({ theme: newTheme });
      localStorage.setItem("theme", newTheme);
    }
  }));

const useOrderId = create ((set) =>({
    orderId : '',
    setOrderId : (id) => {
        set({orderId : id})
    }
}))

export {useOpenCartDrawer,useOpenForgotPassword,useOpenLogin,useOpenSignUp,useTheme,useOpenCategory,useOrderId,useOpenTrackOrder}
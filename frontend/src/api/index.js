const backendDomain = "https://mensfashionapp.onrender.com/"
//http://localhost:8089/

const summeryApi = {
  // User APIs
  sendMail: {
    url: `${backendDomain}user/sendMail`,
    method: "post",
  },
  signUp: {
    url: `${backendDomain}user/sign-up`,
    method: "post",
  },
  logIn: {
    url: `${backendDomain}user/login`,
    method: "post",
  },
  getUser: {
    url: `${backendDomain}user/current-user`,
    method: "get",
  },
  logOut: {
    url: `${backendDomain}user/logout`,
    method: "get",
  },
  checkUser: {
    url: `${backendDomain}user/check-user`,
    method: "post",
  },
  getAllUsers : {
    url: `${backendDomain}user/all-users`,
    method: "get",
  },
  editUser : {
    url: `${backendDomain}user/edit-user/`,
    method: "put",
  },
  currentUser : {
    url: `${backendDomain}user/current-user/`,
    method: "get",
  },
  editUserProfile : {
    url: `${backendDomain}user/edit-user-details`,
    method: "put",
  },
  loginWithGoogle : {
    url : `${backendDomain}user/login-with-google`,
    method : 'post'
  },
  protectUser : {
    url : `${backendDomain}user/protect-user`,
    method : 'get'
  },
  forgotPassword : {
    url : `${backendDomain}user/forgot-password`,
    method : 'post'
  },
  

  // Product APIs
  addProduct : {
    url: `${backendDomain}product/add-product`,
    method: "post",
  },
  deleteImage : {
    url: `${backendDomain}product/delete-image`,
    method: "post",
  },
  getAllProducts : {
    url: `${backendDomain}product/all-products`,
    method: "get",
  },
  getProductById : {
    url : `${backendDomain}product/get-product-id/`,
    method : 'get'
  },
  updateProduct : {
    url: `${backendDomain}product/update-product/`,
    method: "put",
  },
  deleteProduct : {
    url: `${backendDomain}product/delete-product/`,
    method: "delete",
  },


  // Category APIs
  addCategory : {
    url: `${backendDomain}category/add-category`,
    method: "post",
  },
  getAllCategories : {
    url: `${backendDomain}category/get-all-categories`,
    method: "get",
  },
  getCategoryById:{
    url: `${backendDomain}category/get-category-by-id`,
    method: "get",
  },


  // Cart APIs
  addToCart : {
    url: `${backendDomain}cart/add-to-cart`,
    method: "post",
  },
  getCartItems : {
    url: `${backendDomain}cart/get-cart-items`,
    method: "get",
  },
  removeCartItem : {
    url: `${backendDomain}cart/remove-cart-item/`,
    method: "delete",
  },
  clearAllCartItems : {
    url: `${backendDomain}cart/clear-cart/`,
    method: "delete",
  },
  editCart : {
    url: `${backendDomain}cart/edit-cart`,
    method: "put",
  },
  

  // Order APIs
  newOrder : {
    url: `${backendDomain}order/new-order`,
    method: "post",
  },
  payment : {
    url: `${backendDomain}order/payment`,
    method: "get",
  },
  verifyPayment : {
    url: `${backendDomain}order/verify`,
    method: "post",
  },
  loggedUserOrders : {
    url: `${backendDomain}order/user-orders`,
    method: "get",
  },
  getAllOrders : {
    url: `${backendDomain}order/get-all-orders`,
    method: "get",
  },

  
  // Review APIs
  addReview:{
    url: `${backendDomain}review/add-review`,
    method: "post",
  },
  getAllReviews : {
    url: `${backendDomain}review/get-reviews/`,
    method: "get",
  }
};

export default summeryApi;

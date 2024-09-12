import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import AdminCard from "../components/AdminCard";
import {useOpenAddProduct, useOpenEditProduct,useOpenDeleteProduct, useGetAllProducts} from "../store/productStore"
import AddProductForm from "./AddProductForm";
import EditProduct from "./EditProduct";
import DeleteProduct from "../components/DeleteProduct";
import Loading from '../components/Loading'



const AdminProduct = () => {

  const {openAddProduct,setOpenAddProduct} = useOpenAddProduct()
  const {openEditProduct} = useOpenEditProduct()
  const {openDeleteProduct} = useOpenDeleteProduct()
  const {allProducts,setAllProducts} = useGetAllProducts()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
   setAllProducts()
   setLoading(false)
  },[setAllProducts])  



  return (
    <div>

      {openAddProduct && <AddProductForm/>}
      {openEditProduct && <EditProduct/>}
      {openDeleteProduct && <DeleteProduct/>}

      <div className="flex justify-end mb-4">
      <Link onClick={setOpenAddProduct} className="flex items-center cursor-pointer gap-2 text-lg bg-secondary-color hover:bg-black hover:text-white transition-all px-4 py-2 rounded-full" >
          <h1>Add Products </h1>
          <span className="text-xl">
            <IoIosAddCircle />
          </span>
        </Link>
      </div>
      <div>
        <h4 className="p-4 text-secondary-color text-lg font-medium">
          Showing all products...
        </h4>
      </div>
      <div className="flex flex-wrap gap-4 p-2">
        {loading ? <Loading/> : allProducts ? (
          allProducts.map((product, index) => (
            <div key={index}>
              <AdminCard image={product.images[0]} name={product.productName} id={product._id} />
            </div>
          ))
        ) : (
          <Loading/> 
        )}
      </div>
    </div>
  );
};

export default AdminProduct;

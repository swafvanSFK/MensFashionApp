import { Box } from "@mui/material";
import Card from "../components/Card";
import Grid from "@mui/material/Grid";
import { useGetAllProducts } from "../store/productStore";
import { useEffect } from "react";

const TopProducts = () => {
  const {allProducts,setAllProducts} = useGetAllProducts()

  useEffect(()=>{
    setAllProducts()
  },[setAllProducts])

  const filterOnecategory = allProducts.filter((item) => item.category === '66a67bc4afa92221bfc09637')
   
  return (
    <div className="">
      <div data-aos="zoom-in">
        <p style={{ color: "#269FB7" }} className="lg:mt-8 mt-10 text-center dark:text-white">
          Flawless Threads
        </p>
        <h3 className="lg:py-4 py-1 text-black text-center lg:text-2xl text-xl font-semibold dark:text-white">
          Upgrade Your Wardrobe with Us
        </h3>
        <p className="text-slate-400 text-xs text-center">
          Revamp Your Style with Our Collection
        </p>
      </div>
      <Grid
        container
        className="mt-8 sm:px-20 lg:px-32 mx-auto text-black flex flex-wrap justify-center lg:gap-5 gap-3"
      >
        {filterOnecategory.map((item, index) => (
          <Box key={index}>
            <Grid>
              <Card 
                id={item?._id} 
                image={item?.images[0]}
                name={item?.productName}
                offerPrice={item?.discountedPrice}
                brand={item?.brand}
                discount={item?.discountPercentage}
                salePrice={item?.price}/>
            </Grid>
          </Box>
        ))}
      </Grid>
    </div>
  );
};

export default TopProducts;

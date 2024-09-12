import { useEffect, useState } from "react";
import Card from "../components/Card";
import SearchProduct from "../components/SearchProduct";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { GoSortDesc } from "react-icons/go";
import { IoOptionsOutline } from "react-icons/io5";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useGetAllProducts } from "../store/productStore";
import Loading from "../components/Loading";
import useDarkSide from "../hooks/darkSide";


const AllProducts = () => {
  const { setAllProducts, allProducts } = useGetAllProducts();
  const [searchInput, setSearchInput] = useState('');
  const [loading,setLoading] = useState(false)
  const [colorTheme] = useDarkSide();
  const [sortOption, setSortOption] = useState('popularity');



  useEffect(() => {
    const fetchAllProduct = async () => {
      setLoading(true)
      await setAllProducts();
      setLoading(false)
    };
    fetchAllProduct();
  }, [setAllProducts]);
  

  const filteredProducts = allProducts?.filter((product) =>
    product.productName.toLowerCase().includes(searchInput.toLowerCase())
  );
  

  const [open, setOpen] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen({ ...open, [anchor]: open });
  };


  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setAllProducts(
      event.target.value === 'highToLow' ? 'discountedPrice' : 'createdAt' && event.target.value === 'lowToHigh' ? 'discountedPrice' : 'createdAt',
       event.target.value === 'lowToHigh' ? 'asc' : 'desc' && event.target.value === 'highToLow' ? 'desc' : 'asc' &&
       event.target.value === 'popularity' ? 'discountedPrice' : 'createdAt'
      )
    };
 

  const list = (anchor) => (
    <Box className='dark:bg-gray-800' sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250, padding: '10px' }} role="presentation" onClick={toggleDrawer(anchor, true)} onKeyDown={toggleDrawer(anchor, true)}>
      <List className="dark:text-white">
        <FormControl>
          <FormLabel sx={{color : colorTheme === "dark" ? "white" : "black" }} id="demo-radio-buttons-group-label">Sort By</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="popularity"
            name="radio-buttons-group"
            value={sortOption}
            onChange={handleSortChange}
          >
            <FormControlLabel value="popularity" control={<Radio sx={{color : colorTheme === "dark" ? "white" : "black" }}/>} label="Popularity" />
            <FormControlLabel value="lowToHigh" control={<Radio sx={{color : colorTheme === "dark" ? "white" : "black" }}/>} label="Price--Low to High" />
            <FormControlLabel value="highToLow" control={<Radio sx={{color : colorTheme === "dark" ? "white" : "black" }}/>} label="Price--High to Low" />
            <FormControlLabel value="new" control={<Radio sx={{color : colorTheme === "dark" ? "white" : "black" }}/>} label="Newest First" />
            <FormControlLabel value="discount" control={<Radio sx={{color : colorTheme === "dark" ? "white" : "black" }}/>} label="Discount" />
          </RadioGroup>
        </FormControl>
      </List>
    </Box>
  );


  return (
    <Box className="py-8 flex flex-col gap-8 dark:bg-gray-900 dark:text-white">
      {/* Filter option for small devices */}
      <Box  className="flex flex-col gap-5 md:gap-0 lg:gap-0 md:flex-row lg:flex-row items-center bg-white py-4 sticky w-full z-10 top-0 dark:bg-gray-800 dark:text-white">
        <Box>
          <SearchProduct searchInput={searchInput} setSearchInput={setSearchInput} />
        </Box>
        {["bottom"].map((anchor) => (
          <Box key={anchor} className='flex w-full'>
            <Box className=" flex flex-row w-full bg-secondary-color text-white justify-around items-center py-2">
              <Box
                onClick={toggleDrawer(anchor, true)}
                className="flex-1 flex items-center justify-center border-r-2 cursor-pointer gap-1 text-center font-medium text-lg"
              >
                <GoSortDesc className="text-2xl" />
                Sort
              </Box>
              <Box className="flex-1 flex items-center justify-center gap-1 cursor-pointer text-center font-medium text-lg">
                <IoOptionsOutline className="text-xl" />
                Filter
              </Box>
            </Box>
            <Drawer
              anchor={anchor}
              open={open[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </Box>
        ))}
      </Box>

      {/* Filter option for big devices */}
      <>
      {loading?<Loading/>:<aside className="bg-white flex flex-col w-full lg:p-5 p-0 dark:bg-gray-900">
        <h1 data-aos='fade-left' className="text-xl font-medium my-4 lg:text-start text-center">
          {`Showing all ${filteredProducts.length} products...`}
        </h1>
        <div className="flex justify-center flex-wrap gap-5 mb-5">
          {filteredProducts.map((item, index) => (
            <div key={index} className="flex">
              <Card
                id={item?._id}
                image={item?.images[0]}
                name={item?.productName}
                brand={item?.brand}
                offerPrice={item?.discountedPrice}
                discount={item?.discountPercentage}
                salePrice={item?.price}
                stock={item?.stock}
              />
            </div>
          ))}
        </div>
      </aside>}
      
      </>
    </Box>
  );
};

export default AllProducts;

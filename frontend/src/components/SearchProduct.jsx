import { Box, TextField, InputAdornment } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import { Autocomplete, createFilterOptions } from '@mui/material';
import { useGetAllCategories } from "../store/productStore";

const SearchProduct = ({searchInput,setSearchInput}) => {
  const {setAllCategories,categories} = useGetAllCategories()

  useEffect(()=>{
    setAllCategories()
  },[setAllCategories])  

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
  });

  const myOptions = categories?.map((item) => item.category);  

  const handleInputChange = (event, value) => {
    setSearchInput(value);
  };

  return (
    <Box  data-aos='fade-right' className="flex items-center rounded-full mx-2 justify-center dark:bg-gray-700 dark:text-white">
      <Box className="w-full rounded-full">
        <Autocomplete
          style={{ width: 380 }}
          value={searchInput} 
          freeSolo
          filterOptions={filterOptions}
          options={myOptions || []}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0px",
                },
              }}
              size="small"
              id="outlined-basic"
              label="Search Products..."
              variant="outlined"
              className="rounded-md dark:bg-gray-700 w-full p-0"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <CiSearch />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SearchProduct;

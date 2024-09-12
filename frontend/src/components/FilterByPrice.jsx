import Slider from "@mui/material/Slider";
import { useState } from "react";
import MyButton from "../ui/MyButton";

const FilterByPrice = () => {
  const [value, setValue] = useState([100, 10000]);
  function valuetext(value) {
    return `${value}°C`;
  }
  const minDistance = 500;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div data-aos='fade-right' className="shadow-2xl min-h-[300px] flex flex-col justify-evenly p-8 bg-white  dark:bg-gray-800">
      <div>
        <h1 className="text-2xl text-center font-medium">Filter By Price</h1>
      </div>
      <div className="my-6 relative">
        <div>
          <Slider
            step={100}
            getAriaLabel={() => "Minimum distance"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            min={500}
            max={6000}
            className="sliderStyles"
            sx={{color:'#269fb7'}}
            color="primary"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <MyButton $color='true' className="dark:border-none">Apply</MyButton>
      </div>
    </div>
  );
};

export default FilterByPrice;

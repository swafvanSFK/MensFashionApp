import { Avatar, Box } from "@mui/material";
import testimonialImg from "../assets/Bill Cunningham.jpg";

const Quotes = () => {
  return (
    <Box className=" w-full min-h-96 dark:bg-gray-800 mt-20 flex items-center justify-center lg:pl-96 dark:p-0 p-0 text-black">
      <Box className="flex justify-end items-center">
        <Box data-aos="fade-zoom-in" className="flex flex-col items-center gap-2">
          <p style={{ color: "#269FB7" }} className="text-lg font-semibold">
            About Fashion
          </p>
          <p className="text-4xl font-semibold dark:text-white">A Renowned Saying</p>
          <p className="max-w-[500px] md:text-lg lg:text-lg text-sm  text-center italic dark:text-white">
            &quot;Fashion is the armor to survive the reality of everyday life.
            Without it, we’re just ordinary people.&quot;{" "}
          </p>
          <Box className="flex flex-col items-center gap-2 mt-3">
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={testimonialImg}
              alt="Bill Cunningham"
            />
            <p className="text-sm dark:text-white">Bill Cunningham</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Quotes;

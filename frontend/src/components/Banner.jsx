import MyButton from '../ui/MyButton'
import banner from "../assets/banner.jpg"

const Banner = () => {
  return (
    <div data-aos="fade-up"  className='mt-0 md:mt-32 lg:mt-32 py-5 '>
        <div className='text-black lg:px-32  justify-center lg:bg-transparent dark:bg-gray-800 bg-gray-100 relative'>
            <img className="lg:w-full dark:invisible lg:visible md:visible invisible h-72 md:h-96 lg:h-96  lg:object-cover md:w-full md:object-cover" src={banner} alt="" />
            <div className='flex flex-col lg:mt-0 dark:text-white items-center justify-center  lg:gap-5 gap-4 absolute top-[25%] lg:right-[20%] right-0 dark:right-[0] md:dark:right-[20%] lg:dark:right-[34%]'>
                <p className='text-md dark:text-white md:text-white lg:text-white text-black font-semibold'>Be Classic, Be Modern</p>
                <h3 className='lg:text-4xl dark:text-white text-xl md:text-white lg:text-white  text-black font-semibold'>A Stylish New Era</h3>
                <p className='lg:text-sm dark:text-white text-xs text-center md:text-white lg:text-white text-black font-md lg:mb-0 mb-4 max-w-[500px]'>Fashion is the canvas where creativity, individuality, and artistry combine to paint a unique and expressive picture of self.</p>
                <MyButton $color='true'>View More</MyButton>
            </div>
        </div>
    </div>
  )
}

export default Banner
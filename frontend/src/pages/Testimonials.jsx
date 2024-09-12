import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import testimonials from '../data/testimonials'
import logoImg from '../assets/logoImgWhite.png'
import { Box, Divider, Typography } from '@mui/material'
import useDarkSide from '../hooks/darkSide'

const Testimonials = () => {

    const [colorTheme] = useDarkSide();


  return (
    <>
        <Box id={colorTheme === 'dark'? '' : "testimonials"}  className='h-52 md:h-52 lg:h-96 flex flex-col justify-between pb-10 dark:bg-gray-900'>
            <Box>
            <Navbar logo={logoImg} logoColor={'white'} textColor={'text-white'} borderColor={'border-black'} smTextColor={'text-black'}/>
            </Box>
            <Box data-aos="zoom-in">
                <Typography  className='!text-[50px] md:!text-[50px] lg:!text-[90px] text-white text-center font-medium'>Testimonials</Typography>
            </Box>
        </Box>
        <Box id={colorTheme === 'dark' ? '' : 'bg-2'} className=' dark:bg-gray-700 lg:h-[1200px]'>
            <Box className='flex justify-center'>
                <Box data-aos='zoom-in' className='max-w-[900px] lg:p-[50px] p-5 bg-white dark:bg-gray-800 shadow-xl md:my-[50px] lg:mt-[145px]'>
                    <Box  className='flex flex-col gap-8'>
                        {
                            testimonials.map((quotes,index) => (
                                <Box data-aos='zoom-in' key={index} className='flex flex-col gap-5 pb-4 border-b-[1px] border-gray-200'>
                                    <Box className='lg:text-xl italic'>
                                        <Typography variant='p' className='dark:text-white'>&quot;{quotes.quote}&quot;</Typography>
                                    </Box>
                                    <Box className='flex items-center gap-3'>
                                        <Box>
                                            <img className='w-[100px] h-[100px] object-cover object-top rounded-full' src={quotes.image} alt="img" />
                                        </Box>
                                        <Box className='text-md font-medium dark:text-white'>
                                            {quotes.name}
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
        <Divider className='dark:bg-gray-700'/>
        <Box>
            <Footer/>
        </Box>
    </>
  )
}

export default Testimonials
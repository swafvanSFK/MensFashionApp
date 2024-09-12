import logoImg from '../assets/LogoImgBlack.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, Outlet } from 'react-router-dom'
import adminPanelList from '../data/adminPanelData'
import { useState } from 'react'
import CartDrawer from '../components/CartDrawer'
import { Box } from '@mui/material'
 

const AdminPanel = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    

    const handleActive = (index) => {
        setActiveIndex(index)
      }

  return (
    <>
      <CartDrawer/>
      <Box  className=' flex flex-col justify-between border-b shadow-xl dark:bg-gray-900'>
        <Navbar logo={logoImg} logoColor={"black"} fontColor={"black"}/>
      </Box>
      <Box className=' flex h-screen'>
        <aside className='min-w-[250px] dark:bg-gray-800 text-black late-400  pr-8 py-8'>
          <Box>
            <ul className='flex flex-col gap-1 dark:text-white'>
              {
                adminPanelList.map((item,index) => {
                  return(
                    <Link to={item.path} onClick={()=>handleActive(index)} id='admin-panel' key={index} className={`${activeIndex === index ? 'active':''} flex items-center gap-2 py-3 pl-4 rounded-r-full cursor-pointer hover:text-white text-lg`}>
                      <Box>{item.icon}</Box> 
                      <li className='font-md '>{item.label}</li>
                    </Link>
                  )
                })
              }
            </ul>
          </Box>
        </aside>
        <aside className='shadow-lg w-full p-4 overflow-scroll overflow-x-hidden dark:bg-gray-700'>
          <Outlet/>
        </aside>
      </Box>
      <Box>
        <Footer/>
      </Box>
    </>
  )
}

export default AdminPanel
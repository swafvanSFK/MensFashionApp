import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaThreads } from "react-icons/fa6";
import LogoImg from '../assets/logoImgWhite.png'

const Footer = () => {
  return (
    <>
    <footer className='flex flex-col lg:mt-0  lg:justify-between min-h-[350px] lg:px-32 px-5 lg:py-16 py-4 bg-black text-white dark:bg-gray-800'>
    <div className=' flex justify-between lg:flex-row flex-col '>
        <div className='flex flex-col lg:items-start items-center'>
          <h1 className='text-2xl lg:mb-5 mb-2'>Contact Details</h1>
          <div className='flex flex-col lg:items-start items-center gap-1'>
          <p className='cursor-pointer hover:text-blue-400 transition-all'>(+91) 256300548</p>
          <p className='cursor-pointer hover:text-blue-400 transition-all'>mensfashion@info.com</p>
          <p className='cursor-pointer hover:text-blue-400 transition-all'>123 Fifth Avenue, New York, NY 10160</p>
          </div>
        </div>
        <div className='my-5 md:my-5 lg:my-8 lg:text-start flex justify-center'>
          <img src={LogoImg} className="w-[150px] md:w-[190px] lg:w-[200px] md:py-0 lg:py-5 text-lg lg:text-3xl font-semibold" alt="" />
        </div>
        <div className='min-w-[230px] flex flex-col lg:items-end items-center'>
          <h1 className='text-2xl lg:mb-5 mb-2'>Quick Links</h1>
          <div className='flex flex-col gap-1 lg:items-end items-center'>
          <p className='cursor-pointer hover:text-blue-400 transition'>Shipping & Returns</p>
          <p className='cursor-pointer hover:text-blue-400 transition'>Contact</p>
          <p className='cursor-pointer hover:text-blue-400 transition'>Customer Service</p>
          </div>
        </div>
      </div>
      <div className='flex lg:flex-row flex-col justify-between lg:gap-0 gap-3 mt-10'>
        <p className='text-xs text-center'>Copyright © 2024 Men&apos;s Store | Powered by Fashion Store</p>
        <div className='flex gap-5 lg:justify-start justify-center'>
            <div className='cursor-pointer hover:text-blue-400 transition-all'><FaInstagram/></div>
            <div className='cursor-pointer hover:text-blue-400 transition-all'><FaFacebook/></div>
            <div className='cursor-pointer hover:text-blue-400 transition-all'><CiTwitter/></div>
            <div className='cursor-pointer hover:text-blue-400 transition-all'><FaThreads/></div>
        </div>
      </div>
    </footer>
      
      
    </>
  )
}

export default Footer
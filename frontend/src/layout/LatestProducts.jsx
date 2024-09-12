import { useEffect } from 'react'
import Card from '../components/Card'
import { useGetAllProducts } from '../store/productStore'

const LatestProduct = () => {

  const {allProducts,setAllProducts} = useGetAllProducts()
  useEffect(()=>{
    setAllProducts()
  },[setAllProducts])
  const featuredProducts = allProducts.filter((item) => item.isFeatured === true)


  return (
    <div className='lg:h-screen text-black lg:mt-32 mb-20 md:mb-20 lg:mb-0 mt-20 lg:px-16 px-10 dark:lg:border-b-[1px] dark:border-t-white'>
        <div data-aos="zoom-in" className='flex flex-col items-center gap-2'>
            <p style={{color:"#269FB7"}}>Blossom into a New You!</p>
            <p className='text-4xl font-semibold dark:text-white'>Latest Products</p>
            <p className='dark:text-white text-md '>Just Launched: Latest Collection</p>
        </div>
        <div className='flex flex-col lg:flex-row md:flex-row md:flex-wrap md:px-16 gap-5 lg:px-0 justify-center lg:gap-10 lg:items-start items-center lg:mt-32 mt-20'>
            {
              featuredProducts.map((item)=>(
                <Card key={item._id} 
                id={item?._id}
                image={item?.images[0]}
                name={item?.productName}
                offerPrice={item?.discountedPrice}
                brand={item?.brand}
                discount={item?.discountPercentage}
                salePrice={item?.price}/>
              ))
            }
        </div>
    </div>
  )
}

export default LatestProduct
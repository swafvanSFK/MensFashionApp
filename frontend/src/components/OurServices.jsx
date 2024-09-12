
import ServicesComponent from "./ServicesComponent";
import { FaPercentage } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";

const OurServices = () => {
  return (
    <div className="flex sm:my-32 md:my-16 lg:my-0 lg:flex-row flex-col justify-evenly lg:px-32 px-10 lg:gap-0 gap-10 lg:mt-32 ">
    <ServicesComponent image={<FaPercentage />} title={"Season Sale"} desc={"Unbeatable discounts, trendiest styles: Season Sale - your gateway to fashionable savings and style!"}/>
    <ServicesComponent image={<FaShippingFast />} title={"Free Shipping"} desc={"Experience the convenience of free shipping on all orders, making your online shopping easier and more enjoyable!"}/>
    <ServicesComponent image={<FaUserShield />} title={"Money Back"} desc={"Shop risk-free with our money-back guarantee: If you're not satisfied, we'll refund your purchase, no questions asked."}/>
</div>
  )
}

export default OurServices

const ServicesComponent = ({image,title,desc}) => {
  return (
    <div data-aos="fade-up" className="flex flex-col items-center text-black gap-5 ">
        <div style={{ color: "#269FB7" }} className="text-[40px]">
          <p style={{ borderColor: "#269FB7" }} className="p-3 border rounded-full dark:text-white">
           {image}
          </p>
        </div>
        <div>
          <h1 className="font-semibold text-slate-800 text-xl dark:text-white">{title}</h1>
        </div>
        <div className="max-w-[300px] text-center text-slate-500">
          <h1 className="dark:text-white">
            {desc}
          </h1>
        </div>
      </div>
  )
}

export default ServicesComponent
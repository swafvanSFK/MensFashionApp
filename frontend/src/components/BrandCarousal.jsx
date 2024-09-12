import puma from "../assets/Puma.svg";
import nike from "../assets/Nike.svg";
import adidas from "../assets/Adidas.png";
import hermes from "../assets/Hermes.svg";
import dior from "../assets/dior.svg";
import calvinKlein from "../assets/calvin klein.png";
import levis from "../assets/Levis.png";

const BrandCarousal = () => {
  const brands = [adidas, hermes, dior, calvinKlein, levis, puma, nike];

  return (
    <div data-aos="fade-right" className="flex  justify-center items-center lg:pb-20 pb-0 overflow-hidden">
      <div className="flex rounded-box lg:mt-32 mt-20 bg-[#C1F4F8] dark:bg-gray-700 py-3">
        <div  className="flex justify-center items-center lg:px-20 gap-4 md:gap-10 lg:gap-10 px-4">
        {brands.map((brands, index) => {
          return (
                <img key={index} src={brands} alt="brand" className="w-28 min-w-3" />
          );
        })}
            </div>
      </div>
    </div>
  );
};

export default BrandCarousal;

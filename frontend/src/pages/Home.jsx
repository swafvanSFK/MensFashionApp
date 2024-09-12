import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../layout/Hero";
import LatestProduct from "../layout/LatestProducts";
import Services from "../layout/Services";
import TopProducts from "../layout/TopProducts";
import logoImgWhite from "../assets/logoImgWhite.png";
import BrandCarousal from "../components/BrandCarousal";
import Quotes from "../components/Quotes";
import useDarkSide from "../hooks/darkSide";

const Home = () => {

  const [colorTheme] = useDarkSide();

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <main id={colorTheme === 'dark' ? 'home-dark':'home'} className=" dark:bg-gray-800 dark:text-white">
        <div data-aos="zoom-in">
          <Navbar
            logo={logoImgWhite}
            textColor={"text-white"}
            borderColor={'border-white'}
          />
        </div>
        <Hero />
      </main>
      <div>
        <TopProducts />
        <Services />
        <BrandCarousal/>
        <div id="testimonial-component">
          <Quotes />
        </div>
        <LatestProduct />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;

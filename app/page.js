import Image from "next/image";
import Testimonial from "./components/home/Testimonial/Testimonial";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/footer/Footer";
import Newsletter from "./components/newsletter/Newsletter";
import PopularProduct from "./components/home/PopularProduct";
import Catagories from "./components/home/catagories/Catagories";
import FeaturedProducts from "./components/home/featuredProducts/FeaturedProducts";
import Banner from "./components/home/banner/Banner";
import SpecialOffers from "./components/home/SpecialOffers";

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <Banner />
      <Catagories />
      <FeaturedProducts />
      <PopularProduct />
      <SpecialOffers/>
      <Testimonial />
      <Newsletter />
      <Footer />
    </main>
  );
}

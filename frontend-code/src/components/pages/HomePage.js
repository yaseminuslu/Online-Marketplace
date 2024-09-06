import React from "react";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import Slider from "../pages/Slider";
import ProductList from "../pages/ProductList";

const HomePage = () => {
  const images = [
    "https://i5.walmartimages.com/asr/5dd18cca-dea4-41ac-a99e-2a24da3fdb31.0ccfd85786cffeba271cc3c66e7119bc.jpeg",
    "https://i5.walmartimages.com/seo/Better-Homes-Gardens-Nola-Console-Table-Black-Finish_443e3290-09b3-4d11-b6a1-cf1a065ab89c.3e2ef198ac6517c72a57c1c5e42980e3.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    "https://i5.walmartimages.com/seo/Furmax-U-Shaped-Sectional-Sofa-with-Chaise-4-Seats-Chenille-Fabric-Sofa-for-Living-room-Gray_018b45ba-fb22-4e27-934a-933dc0e7fcc7.07a38839b16fd7d975825069e0afd1b2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    "https://i5.walmartimages.com/seo/Better-Homes-Gardens-Modern-Farmhouse-Rectangle-Lift-Top-Coffee-Table-Rustic-Gray-Finish_e25ed6f1-0e52-4eec-8c4d-9a6ad816a40e.8cb4641d8f8bd02c032b45744c5f760d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  ];
  return (
    <div>
      <Navbar />
      <div className="content">
        <Slider images={images} />
        <ProductList />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

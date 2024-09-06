import React from "react";
import Navbar from "./Navbar";
import ProductList from "../pages/SearchProductsList";

const ProductsPage = () => {
  return (
    <div>
      <Navbar />
      <ProductList></ProductList>
    </div>
  );
};

export default ProductsPage;

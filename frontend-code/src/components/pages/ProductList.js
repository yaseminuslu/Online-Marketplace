import React, { useState, useEffect } from "react";
import "../css/ProductList.css";
import ApiService from "../../ApiService";
import Product from "../Product";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ApiService.get("/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  return (
    <div style={{ marginTop: "15px" }}>
      <div className="product-list">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>{" "}
    </div>
  );
};

export default ProductList;

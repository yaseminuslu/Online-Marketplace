import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../css/ProductList.css";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import Product from "../Product";
import ApiService from "../../ApiService";

const SearchProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const searchProduct = useCallback(() => {
    if (searchQuery.length > 1) {
      axios
        .get("http://localhost:8080/api/v1/products/search", {
          params: {
            searchQuery: searchQuery,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setFilteredProducts(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("There was an error fetching the products!", error);
        });
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, filteredProducts]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    ApiService.get("/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  useEffect(() => {
    searchProduct();
  }, [searchQuery]);

  return (
    <div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div className="breadcrumb">
          <a href="/" className="breadcrumb-item">
            Home /
          </a>
          <span className="breadcrumb-current">Products</span>
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          {role === "ADMIN" ? (
            <CiSquarePlus
              size={32}
              onClick={() => {
                navigate("/add-product");
              }}
            />
          ) : null}

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search in products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <Product
            product={product}
            onDeleted={(value) => {
              if (value) {
                getProduct();
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchProductList;

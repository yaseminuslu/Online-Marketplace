import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../css/BlackListPage.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService";

const BlacklistPage = () => {
  const [blacklist, setBlacklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBlackList, setFilteredBlackList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");

  const fetchBlacklist = async () => {
    try {
      const response = await ApiService.get("/blacklists/user", {
        userId: userId,
      });

      setBlacklist(response.data);
      setFilteredBlackList(response.data);
      setLoading(false);
    } catch (err) {
      setError("Kara liste verileri alınırken bir hata oluştu.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlacklist();
  }, []);

  const searchBlackList = useCallback(() => {
    if (searchQuery.length > 1) {
      ApiService.get("blacklists/search", {
        searchQuery: searchQuery,
      })
        .then((response) => {
          const newFilteredBlackList = response.data.filter(
            (item, index, self) =>
              index === self.findIndex((f) => f.name === item.name)
          );
          setFilteredBlackList(newFilteredBlackList);
        })
        .catch((error) => {
          console.error("There was an error fetching the products!", error);
        });
    } else {
      setFilteredBlackList(blacklist);
    }
  }, [searchQuery, blacklist]);

  useEffect(() => {
    searchBlackList();
  }, [searchQuery, searchBlackList]);

  return (
    <div>
      <Navbar />
      <div className="blacklist-page-container">
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
            <span className="breadcrumb-current">BlackList</span>
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search in blacklists"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="blacklist-loading">Loading...</div>
        ) : error ? (
          <div className="blacklist-error">{error}</div>
        ) : (
          <div
            className="blacklist-container"
            style={{ justifyContent: "center" }}
          >
            {filteredBlackList.map((item) => (
              <BlackListCard
                item={item}
                key={item.id}
                onDeleted={(value) => {
                  if (value) {
                    fetchBlacklist();
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlacklistPage;

const BlackListCard = (props) => {
  const item = props.item;
  const userId = localStorage.getItem("id");
  const [showProducts, setShowProducts] = useState(false);

  const removeSellerFromBlackList = (sellerId) => {
    try {
      axios
        .delete("http://localhost:8080/api/v1/blacklists", {
          params: {
            sellerId: sellerId,
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          props.onDeleted(true);
        });
    } catch (error) {}
  };

  return (
    <div key={item.id} className="blacklist-seller-card">
      <button
        className="blacklist-delete-button"
        onClick={() => removeSellerFromBlackList(item.seller.id)}
      >
        &times;
      </button>
      <h2 className="blacklist-seller-name">
        {item.seller.name?.toUpperCase()}
      </h2>
      <div className="blacklist-warning">Reason: {item.reason}</div>
      <h3 className="blacklist-product-title">
        Seller's Products
        <button
          className="blacklist-toggle-button"
          onClick={() => setShowProducts(!showProducts)}
        >
          {showProducts ? "Hide Products" : "Show Products"}
        </button>
      </h3>
      <div
        className={`blacklist-products-container ${
          showProducts ? "show" : "hide"
        }`}
      >
        {showProducts &&
          item.seller.products.map((product) => (
            <ProductInBlackListCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

const ProductInBlackListCard = (props) => {
  const [imageSrc, setImageSrc] = useState(null);
  const product = props.product;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080${product.imageUrl}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Image fetch failed");
        }

        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImageSrc(imageObjectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [product.imageUrl]);

  return (
    <div key={product.id} className="blacklist-product-card">
      <h6>{product.name}</h6>
      <img
        className="blacklist-product-image"
        src={imageSrc || "default-image-url"}
        alt={product.name}
      />
    </div>
  );
};

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/ProductDetails.css";
import ApiService from "../../ApiService";
import axios from "axios";
import { IoAddCircleOutline } from "react-icons/io5";

// Modal'ın uygulamanın kök elemanına bağlanmasını sağlar
Modal.setAppElement("#root");

const ProductDetails = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [seller, setSeller] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role"); // Kullanıcının rolünü alın

  // Ürün görselini fetch etmek için useEffect
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

  // Satıcı bilgilerini fetch etmek için useEffect
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await ApiService.get("/products/seller", {
          productId: product.id,
        });
        setSeller(response.data);
      } catch (error) {
        console.error("Error fetching seller:", error);
      }
    };

    fetchSeller();
  }, [product.id]);

  // Modal'ı açma işlevi
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Modal'ı kapama işlevi
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Kara listeye ekleme işlevi
  const handleAddToBlacklist = async () => {
    if (reason) {
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("reason", reason);
        formData.append("sellerId", seller.id);

        const token = localStorage.getItem("token");

        await axios.post("http://localhost:8080/api/v1/blacklists", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/blacklist", { replace: true });
      } catch (error) {
        console.error("Error:", error);
      }
      closeModal();
    }
  };

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <div className="product-details-page">
      <Navbar />
      <div className="breadcrumb">Home \ Products \ {product.name}</div>
      <div className="content-wrapper">
        <div className="image-wrapper" style={{ marginLeft: 70 }}>
          <img
            className="main-image"
            src={imageSrc}
            alt={product.name}
            style={{ height: 450 }}
          />
        </div>
        <div className="product-details">
          <h1 className="title">{product.name.toUpperCase()}</h1>
          <h2 style={{ fontSize: 20 }}>{product.category}</h2>
          <div className="price-wrapper">
            <span className="price">${product.price} USD</span>
          </div>
          <div className="description">{product.description}</div>
          <div className="stock-status">In Stock</div>
          <div className="quantity-wrapper">
            <input
              className="quantity-input"
              type="number"
              value="1"
              readOnly
            />
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
          <ul className="features-list">
            <li className="feature-item">Secure Payment</li>
            <li className="feature-item">Fast Shipping</li>
            <li className="feature-item">Lifetime Warranty</li>
          </ul>
        </div>
        {userRole === "USER" && (
          <div className="store-card" style={{ marginRight: 150 }}>
            <div className="store-header">
              <span className="store-name">
                {seller?.name?.toUpperCase() || ""}
              </span>
            </div>
            <div className="store-actions">
              <button className="action-button" onClick={openModal}>
                <IoAddCircleOutline size={20} style={{ marginRight: 10 }} />
                Add Seller To Blacklist
              </button>
            </div>
            <button className="go-to-store-button">STORE</button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Seller To Blacklist"
        style={{
          content: {
            maxWidth: "600px",
            backgroundColor: "transparent",
            top: "100px",
            left: "27%",
            boxShadow: "inherit",
            border: 0,
          },
          overlay: {
            alignContent: "center",
          },
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            flexDirection: "column",
            gap: 12,
            display: "flex",
            margin: "20px auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <textarea
            placeholder="Why do you want to blacklist?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            style={{
              outline: "none" /* Varsayılan odak çerçevesini kaldırır */,
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "16px",
              color: "#333",
              resize: "vertical" /* Allows resizing only vertically */,
              transition: "border-color 0.3s",
            }}
          />
          <button
            onClick={handleAddToBlacklist}
            style={{
              backgroundColor: "#9b8d52" /* Add butonunun rengi */,
              color: "#fff",
              border: 0,
              borderRadius: "4px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              marginRight: "10px",
            }}
          >
            Add
          </button>
          <button
            style={{
              backgroundColor: "#777" /* Cancel butonunun rengi */,
              color: "#fff",
              border: 0,
              borderRadius: "4px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              marginRight: "10px",
            }}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../css/SellerAddPage.css";
import ApiService from "../../ApiService";

function SellerAddPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await ApiService.post("/sellers", data);
      console.log("Satıcı eklendi:", response.data);
      navigate("/seller");
    } catch (error) {
      console.error("Satıcı eklenirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="seller-add-container">
        <div className="seller-add-card">
          <h2
            className="seller-add-card-header"
            style={{ color: "#A6B37D", fontWeight: "bold" }}
          >
            Add New Seller
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="seller-add-form">
            <div className="seller-add-form-group">
              <label
                htmlFor="name"
                style={{ color: "#A6B37D", fontWeight: "bold" }}
              >
                Name:
              </label>
              <input
                id="name"
                className="seller-add-input"
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="seller-add-error">{errors.name.message}</p>
              )}
            </div>
            <div className="seller-add-form-group">
              <label
                htmlFor="phoneNumber"
                style={{ color: "#A6B37D", fontWeight: "bold" }}
              >
                Phone:
              </label>
              <input
                id="phoneNumber"
                className="seller-add-input"
                type="text"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,}$/,
                    message: "Phone number is invalid",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="seller-add-error">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="seller-add-form-group">
              <label
                htmlFor="email"
                style={{ color: "#A6B37D", fontWeight: "bold" }}
              >
                Email:
              </label>
              <input
                id="email"
                className="seller-add-input"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Email is invalid" },
                })}
              />
              {errors.email && (
                <p className="seller-add-error">{errors.email.message}</p>
              )}
            </div>
            <div className="seller-add-form-group">
              <label
                htmlFor="address"
                style={{ color: "#A6B37D", fontWeight: "bold" }}
              >
                Address:
              </label>
              <input
                id="address"
                className="seller-add-input"
                type="text"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="seller-add-error">{errors.address.message}</p>
              )}
            </div>
            <button
              className="seller-add-button"
              type="submit"
              style={{ backgroundColor: "#A6B37D", fontWeight: "bold" }}
            >
              Add Seller
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerAddPage;

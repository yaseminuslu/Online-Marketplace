import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar";
import "../css/UserAddPage.css"; // Your custom CSS file
import ApiService from "../../ApiService";

const UserEditPage = () => {
  const location = useLocation();
  const { user } = location.state || {};

  function splitFullname(fullname) {
    const parts = fullname.split(" ");
    const surname = parts.pop();
    const name = parts.join(" ");
    return { name, surname };
  }

  const { name, surname } = splitFullname(user.fullname);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      surname: surname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      username: user.username,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await ApiService.post("/users", data);
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="user-add-body">
        <div className="user-add-container">
          <div className="user-add-card">
            <h2
              className="user-add-card-header"
              style={{ color: "#A6B37D", fontWeight: "bold" }}
            >
              Edit User
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="user-add-form">
              <div className="user-add-form-group">
                <label
                  className="user-add-form-group label"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Name:{" "}
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="user-add-input"
                />
                {errors.name && (
                  <p className="user-add-error">{errors.name.message}</p>
                )}
              </div>
              <div className="user-add-form-group">
                <label
                  className="user-add-form-group label"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Surname:{" "}
                </label>
                <input
                  type="text"
                  {...register("surname", { required: "Surname is required" })}
                  className="user-add-input"
                />
                {errors.surname && (
                  <p className="user-add-error">{errors.surname.message}</p>
                )}
              </div>
              <div className="user-add-form-group">
                <label
                  className="user-add-form-group label"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Email:{" "}
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="user-add-input"
                />
                {errors.email && (
                  <p className="user-add-error">{errors.email.message}</p>
                )}
              </div>
              <div className="user-add-form-group">
                <label
                  className="user-add-form-group label"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Phone:
                </label>
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  className="user-add-input"
                />
                {errors.phoneNumber && (
                  <p className="user-add-error">{errors.phoneNumber.message}</p>
                )}
              </div>
              <div className="user-add-form-group">
                <label
                  className="user-add-form-group label"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Username:
                </label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="user-add-input"
                />
                {errors.username && (
                  <p className="user-add-error">{errors.username.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="user-add-button"
                style={{ backgroundColor: "#A6B37D", fontWeight: "bold" }}
              >
                Edit User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import "../css/UserAddPage.css";
import ApiService from "../../ApiService";

const UserAddPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      roles: ["USER"],
      email: "",
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await ApiService.post("/users", data);
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="user-add-container">
        <div className="user-add-card">
          <h2
            className="user-add-card-header"
            style={{ color: "#A6B37D", fontWeight: "bold" }}
          >
            Add User
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="user-add-form">
            {/* Name and Surname */}
            <div className="form-row">
              <div className="user-add-form-group">
                <label
                  htmlFor="name"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Name:
                </label>{" "}
                {/* İki nokta eklendi */}
                <input
                  type="text"
                  id="name"
                  className="user-add-input"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="user-add-error">{errors.name.message}</p>
                )}
              </div>

              <div className="user-add-form-group">
                <label
                  htmlFor="surname"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Surname:
                </label>{" "}
                {/* İki nokta eklendi */}
                <input
                  type="text"
                  id="surname"
                  className="user-add-input"
                  {...register("surname", { required: "Surname is required" })}
                />
                {errors.surname && (
                  <p className="user-add-error">{errors.surname.message}</p>
                )}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="form-row">
              <div className="user-add-form-group">
                <label
                  htmlFor="email"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Email:
                </label>{" "}
                {/* İki nokta eklendi */}
                <input
                  type="email"
                  id="email"
                  className="user-add-input"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="user-add-error">{errors.email.message}</p>
                )}
              </div>

              <div className="user-add-form-group">
                <label
                  htmlFor="phoneNumber"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Phone:
                </label>{" "}
                {/* İki nokta eklendi */}
                <input
                  type="text"
                  id="phoneNumber"
                  className="user-add-input"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <p className="user-add-error">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            {/* Username and Password */}
            <div className="form-row">
              <div className="user-add-form-group">
                <label
                  htmlFor="username"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Username:{" "}
                </label>{" "}
                {/* İki nokta eklendi */}
                <input
                  type="text"
                  id="username"
                  className="user-add-input"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="user-add-error">{errors.username.message}</p>
                )}
              </div>

              <div className="user-add-form-group">
                <label
                  htmlFor="password"
                  style={{ color: "#A6B37D", fontWeight: "bold" }}
                >
                  Password:
                </label>{" "}
                {/* İki nokta eklendi */}
                <input
                  type="password"
                  id="password"
                  className="user-add-input"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="user-add-error">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="user-add-button"
              style={{ backgroundColor: "#A6B37D", fontWeight: "bold" }}
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAddPage;

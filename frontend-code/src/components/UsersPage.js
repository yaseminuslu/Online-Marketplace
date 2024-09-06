import React from "react";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ApiService from "../ApiService";
import axios from "axios";
import Navbar from "./pages/Navbar";
import "../components/css/UsersPage.css";

const UsersPage = () => {
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [userList, setUserList] = React.useState([]);

  const searchUsers = React.useCallback(() => {
    if (searchQuery.length > 1) {
      axios
        .get("http://localhost:8080/api/v1/users/search", {
          params: { searchQuery },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => setFilteredUsers(response.data))
        .catch((error) =>
          console.error("There was an error fetching the users!", error)
        );
    } else {
      setFilteredUsers(userList);
    }
  }, [searchQuery, userList]);

  const fetchUsers = async () => {
    try {
      const response = await ApiService.get("/users");
      setUserList(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  React.useEffect(() => {
    searchUsers();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 20px",
        }}
      >
        <div className="breadcrumb">
          <a href="/" className="breadcrumb-item">
            Home /
          </a>
          <span className="breadcrumb-current">Users</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CiSquarePlus
            size={32}
            onClick={() => navigate("/add-user")}
            style={{ cursor: "pointer" }}
          />
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search in users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: 20, margin: 30 }}>
        {filteredUsers.map((user, index) => (
          <UserCard user={user} key={index} onDeleted={() => fetchUsers()} />
        ))}
      </div>
    </div>
  );
};

const UserCard = ({ user, onDeleted }) => {
  const navigate = useNavigate();

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return phoneNumber; // Formatlama mümkün değilse orijinal numarayı döndür
  };

  const deleteUser = (userId) => {
    ApiService.delete(`/users/${userId}`)
      .then(() => onDeleted())
      .catch((error) =>
        console.error("There was an error deleting the user!", error)
      );
  };

  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3"
      style={{ marginBottom: 20 }}
    >
      <div className="our-team">
        <div className="picture">{getInitials(user.fullname)}</div>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <FaRegEdit
            onClick={() => navigate("/edit-user", { state: { user } })}
            style={{ width: 20, height: 20, cursor: "pointer" }}
          />
          <MdDeleteOutline
            onClick={() => deleteUser(user.id)}
            style={{ width: 23, height: 23, cursor: "pointer", marginTop: 0 }}
          />
        </div>
        <div className="team-content">
          <h4 className="titleOne">{user.fullname}</h4>
          <h6 className="title">{user.roles[0]}</h6>
        </div>
        <ul className="social">
          <li>{user.email}</li>
          <li>0{formatPhoneNumber(user.phoneNumber)}</li>{" "}
          {/* Formatlı telefon numarası */}
        </ul>
      </div>
    </div>
  );
};

export default UsersPage;

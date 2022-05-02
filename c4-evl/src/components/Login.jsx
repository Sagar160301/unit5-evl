import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuth, User } from "../Redux/actions";

export const Login = () => {
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitData = async () => {
    try {
      let res = await fetch(
        `http://localhost:8080/users?username=${user.username}&pass=${user.password}`
      );
      let data = await res.json();
      data = await data;
      //   console.log(data);
      dispatch(isAuth(true));
      dispatch(User(data[0]));

      //   console.log(data[0]);
      if (data[0].role === "admin") {
        navigate("/orders");
      } else if (data[0].role === "client") {
        navigate("/neworder");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        className="username"
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="Enter Username"
      />
      <input
        className="password"
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Enter password"
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className="submit" onClick={submitData}>
        Login
      </button>
    </div>
  );
};

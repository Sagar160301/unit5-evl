import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { NewOrder } from "./components/NewOrder";
import { Orders } from "./components/Orders";
// import { ProtectedRoute } from "./components/ProtextedRoute";
import { Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((store) => store.auth);
  console.log(auth);
  return (
    <div className="App">
      <div>
        <Link className="nav-home" to="/">
          Home
        </Link>
        {/* Show either login or logout below */}
        <span>
          {!auth ? (
            <Link className="nav-login" to="/login">
              Login
            </Link>
          ) : (
            <Link className="nav-logout" to="/logout">
              Logout
            </Link>
          )}
        </span>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/neworder" element={<NewOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;

{
  /* Routes are as follows:
        Route      Component
        /           Home
        /login      Login
        /logout     Logout
        /orders     Orders    Protected
        /neworder   NewOrder  Protected
        */
}

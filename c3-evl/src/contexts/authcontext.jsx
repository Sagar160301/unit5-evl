import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  //   total: get from db,
  const [total, setTotal] = useState(0);
  //   terminated: 0, // inc when user in terminated
  const [terminated, setTerminated] = useState(0);
  //   promoted: 0,// inc when user in promoted
  const [promoted, setPromoted] = useState(0);
  //   total_new: 0,// inc when a new user in created
  const [total_new, setTotal_new] = useState(0);
  useEffect(() => {
    getData();
    return () => {};
  }, []);
  const getData = async () => {
    try {
      let res = await fetch("http://localhost:8080/employee");
      let data = await res.json();
      setTotal(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTerminated = () => {
    setTerminated(terminated + 1);
  };
  const handlePromoted = () => {
    setPromoted(promoted + 1);
  };
  const handleTotalNew = () => {
    setTotal_new(total_new + 1);
  };

  const handleAuth = () => {
    setIsAuth(!isAuth);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        handleAuth,
        total,
        terminated,
        promoted,
        total_new,
        handleTerminated,
        handlePromoted,
        handleTotalNew,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };

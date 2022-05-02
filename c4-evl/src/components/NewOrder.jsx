import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NewOrder = () => {
  const [data, setData] = useState([]);

  const [filt, setfilt] = useState(false);

  const name = useSelector((store) => store.user.username);
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    owner_name: name,
    status: "Not Accepted",
  });
  useEffect(() => {
    if (auth == false) {
      navigate("/login");
    }
    getData();
  }, []);
  //   console.log(name);
  const getData = async () => {
    let res = await fetch(`http://localhost:8080/orders?owner_name=${name}`);
    let data = await res.json();
    if (filt === true) {
      let arr = data.filter((el) => {
        return el.status != "Done";
      });
      console.log(arr);
      setData(arr);
    } else {
      setData(data);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //post data

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(user);
    setUser({ ...user, [name]: value });
  };

  const submitData = async () => {
    try {
      let res = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await res.json();
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  // Get data of only this user. store it in redux
  // GET /orders?owner_name=john will give you all order of user john
  //  on submit click create a new order, new order has status `Not Accepted`
  return (
    <div>
      <div className="form">
        <input
          className="new-problem"
          type="text"
          name="problem"
          onChange={handleChange}
          placeholder="Enter problem"
        />
        {/* This input is readonly, it's coming from redux */}
        <input
          className="owner-name"
          type="text"
          value={name}
          name="owner_name"
          onChange={handleChange}
          placeholder="yourname"
          readOnly
        />
        <input
          className="brand"
          type="text"
          name="brand"
          onChange={handleChange}
          placeholder="Enter brand name"
        />
        {/* Create new problem, show it in below form immediately */}
        <button className="submit" onClick={submitData}>
          submit
        </button>
      </div>

      <div className="pastOrders">
        {/* this button filters the data below. */}
        {/* it's just a toggle of redux state something like `showUnfinished`  */}
        <button
          className="filter"
          onClick={() => {
            console.log(filt);
            setfilt(!filt);
            getData();
          }}
        >
          {filt === false ? "Show All" : "Show Only Unfinished"}
          {/* Text should change like:   Show {showUnfinished ? "all" : "Only unfinished"} */}
        </button>

        {/* Here create a div for every oreder, filter them before based on `showUnfinished` */}
        <div className="past-orders">
          {data.length == 0
            ? null
            : data.map((el) => {
                return (
                  <div key={el.id}>
                    <span className="id">{el.id}</span>.{" "}
                    <span className="problem">{el.problem}</span>{" "}
                    <span className="cost">
                      {el.status === "Not Accepted" ? "---" : `$ ${el.cost}`}
                      {/* if status is not accepted then keep it empty otherwise show cost like $1234 */}
                    </span>
                    <p className="status">Status:{el.status} </p>
                    <hr />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

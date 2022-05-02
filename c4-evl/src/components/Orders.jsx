import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AllData } from "../Redux/actions";

export const Orders = () => {
  const [rand, setR] = useState(true);
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  let all = useSelector((store) => store.all);
  console.log(all, "all");

  const navigate = useNavigate();
  useEffect(() => {
    if (auth == false) {
      navigate("/login");
    }
    getData();
  }, []);
  //  Get all data when admin logs in and populate it
  // store it in redux
  const getData = async () => {
    try {
      let res = await fetch("http://localhost:8080/orders");
      let data = await res.json();
      dispatch(AllData(data));
      setAllData(data);
      setR(!rand);
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (id, key, value) => {
    let obj = { [key]: value };
    try {
      let res = await fetch(`http://localhost:8080/orders/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      let data = await res.json();
      console.log(data, "patch");
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const changeCost = async (id, key, value) => {
    let obj = { [key]: value, status: "In Progress" };
    try {
      let res = await fetch(`http://localhost:8080/orders/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      let data = await res.json();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <select className="controls" name="progress" id="progress">
            <option value="id">ID</option>
            <option value="status">Status</option>
            <option value="cost">Cost</option>
          </select>
        </div>
        <table className="orders">
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem</th>
              <th>Client Name</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Change Status</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            {allData.length == 0
              ? null
              : allData.map((el) => {
                  return (
                    <tr className="orders-row" key={el.id}>
                      <td className="id">{el.id}</td>
                      <td className="problem">{el.problem}</td>
                      <td className="owner">{el.owner_name}</td>
                      <td className="status">{el.status}</td>
                      <td className="cost">
                        {el.cost == undefined ? "-" : `$  ${el.cost}`}
                      </td>
                      <td className="change-status">
                        {/* Show select dropdown only if status is Not Accepted */}
                        {el.status == "Not Accepted" ? null : (
                          <select
                            className="changeStatus"
                            onChange={(e) => {
                              changeStatus(el.id, "status", e.target.value);
                            }}
                            name="changeStatus"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                            <option value="Not Accepted">Not Accepted</option>
                          </select>
                        )}
                      </td>
                      <td className="accept">
                        {el.status == "Not Accepted" ? (
                          <button
                            onClick={(e) => {
                              changeCost(
                                el.id,
                                "cost",
                                Math.round(Math.random(100, 1000))
                              );
                            }}
                          >
                            Accept
                          </button>
                        ) : (
                          ""
                        )}
                        {/* Show this button only if status is Not Accepted */}
                        {/* on change make request to update it in db, and show changed status in table */}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

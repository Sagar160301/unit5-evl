import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";

export const EmployeeDetails = () => {
  const { handleTerminated, handlePromoted } = useContext(AuthContext);
  const [stat, setStat] = useState(false);
  const { id } = useParams();
  //   console.log(id);
  const [employ, setEmploy] = useState([]);
  const [task, setTask] = useState([]);
  useEffect(() => {
    getData();
    return () => {};
  }, [stat]);
  const getData = async () => {
    try {
      let res = await fetch(`http://localhost:8080/employee/${id}`);
      let data = await res.json();
      setEmploy(data);
      setTask(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(employ);
  return (
    <div className="user_details">
      <img className="user_image" src={employ.image} />
      <h4 className="user_name">{employ.employee_name}</h4>
      <span className="user_salary">${employ.salary}</span>
      <span className="tasks">
        {task.map((el, index) => {
          return (
            <li className="task" key={index}>
              {el}
            </li>
          );
        })}
      </span>
      Status: <b className="status">{employ.status}</b> <br />
      Title: <b className="title">{employ.title}</b>
      {/* Show this button only if user is not already terminated (users status is working) */}
      <>
        {employ.status == "working" ? (
          <button
            className="fire"
            onClick={async () => {
              try {
                let update = {
                  title: "terminated",
                };

                let res = await fetch(`http://localhost:8080/employee/${id}`, {
                  method: "PATCH",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(update),
                });
                let data = await res.json();
                // console.log(data);
                setStat(!stat);
                handleTerminated();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Fire Employee
          </button>
        ) : null}
      </>
      {/* Show this button only if user is not already team lead or terminated */}
      <>
        {employ.status !== "terminated" && employ.title !== "Team Lead" ? (
          <button
            className="promote"
            onClick={async () => {
              try {
                let update = {
                  title: "",
                };
                if (employ.title == "Intern") {
                  update.title = "Jr Software Developer";
                } else if (employ.title == "Jr Software Developer") {
                  update.title = "Sr Software Developer";
                } else if (employ.title == "Sr Software Developer") {
                  update.title = "Team Lead";
                }
                let res = await fetch(`http://localhost:8080/employee/${id}`, {
                  method: "PATCH",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(update),
                });
                let data = await res.json();
                // console.log(data);
                setStat(!stat);
                handlePromoted();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            promote
          </button>
        ) : null}
      </>
    </div>
  );
};

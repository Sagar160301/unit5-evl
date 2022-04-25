import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EmployeeList = () => {
  const navigate = useNavigate();
  const [employ, setEmploy] = useState([]);
  useEffect(() => {
    getData();
    return () => {};
  }, []);
  const getData = async () => {
    try {
      let res = await fetch("http://localhost:8080/employee");
      let data = await res.json();
      setEmploy(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(employ);
  return (
    <div className="list_container">
      {/* On clicking this card anywhere, user goes to user details */}
      {employ.map((el) => {
        return (
          <div
            className="employee_card"
            key={el.id}
            onClick={() => {
              navigate(`/employees/${el.id}`);
            }}
          >
            <img className="employee_image" src={el.image} />
            <span className="employee_name">{el.employee_name}</span>
            <span className="employee_title">{el.title}</span>
          </div>
        );
      })}
    </div>
  );
};

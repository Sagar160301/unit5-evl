import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";

export const Admin = () => {
  const { handleTotalNew } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "tasks") {
      let arr = value.trim().split(",");
      setUser({ ...user, [name]: arr });
    } else {
      setUser({ ...user, [name]: value });
    }
    // console.log(name, value);
  };
  const submitDetails = async (e) => {
    try {
      e.preventDefault();
      if (
        user.employee_id != "" &&
        user.employee_name != "fsd" &&
        user.image != "df" &&
        user.password != "sdfds" &&
        user.salary != "343" &&
        user.status != "working" &&
        user.tasks != "sf,fg" &&
        user.team != "frontend" &&
        user.title != "Jr Software Developer" &&
        user.username != ""
      ) {
        let res = await fetch("http://localhost:8080/employee", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        });
        let data = await res.json();
        console.log(data);
        handleTotalNew();
      }
      //   console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="createEmployee" onSubmit={submitDetails}>
      <input
        type="text"
        placeholder="Employee Name"
        onChange={handleChange}
        name="employee_name"
      />
      <input
        type="text"
        placeholder="Employee id"
        onChange={handleChange}
        name="employee_id"
      />
      <select name="title" onChange={handleChange}>
        <option value="intern">Intern</option>
        <option value="Jr Software Developer">Jr Software Developer</option>
        <option value="Sr Software Developer">Sr Software Developer</option>
        <option value="Team Lead">Team Lead</option>
      </select>
      <input
        type="number"
        placeholder="Salary"
        onChange={handleChange}
        name="salary"
      />
      <input
        type="text"
        placeholder="Image"
        onChange={handleChange}
        name="image"
      />
      <input
        type="text"
        placeholder="User Name"
        onChange={handleChange}
        name="username"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="password"
      />
      <input
        type="text"
        placeholder="Enter tasks separated by commas"
        onChange={handleChange}
        name="tasks"
      />
      <select name="status" id="status" onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="terminated">Terminated</option>
        <option value="working">Working</option>
      </select>
      <select name="team" id="team" onChange={handleChange}>
        <option value="">Select team</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="qa">QA</option>
      </select>
      <input className="createUser" type="submit" value={"submit"} />
    </form>
  );
};

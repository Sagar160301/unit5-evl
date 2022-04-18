import { useEffect, useRef, useState } from "react";

export const ShowStudents = () => {
  const [allData, setAllData] = useState([]);
  const sortAD = useRef({});
  const sortNM = useRef({});

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      let res = await fetch("http://localhost:8080/students");
      let data = await res.json();
      //   console.log(data);
      data.sort((a, b) => {
        // console.log(a.first_name.charCodeAt(0), "char");
        return a.first_name.charCodeAt(0) - b.first_name.charCodeAt(0);
      });
      if (sortAD.current == "asc") {
        if (sortNM.current == "first_name") {
          data.sort((a, b) => {
            // console.log(a.first_name.charCodeAt(0), "char");
            return a.first_name.charCodeAt(0) - b.first_name.charCodeAt(0);
          });
        } else if (sortNM.current == "gender") {
          data.sort((a, b) => {
            // console.log(a.first_name.charCodeAt(0), "char");
            return a.gender.charCodeAt(0) - b.gender.charCodeAt(0);
          });
        } else {
          data.sort((a, b) => {
            return a[sortNM.current] - b[sortNM.current];
          });
        }
      }
      if (sortAD.current == "desc") {
        if (sortNM.current == "first_name") {
          data.sort((a, b) => {
            // console.log(a.first_name.charCodeAt(0), "char");
            return b.first_name.charCodeAt(0) - a.first_name.charCodeAt(0);
          });
        } else if (sortNM.current == "gender") {
          data.sort((a, b) => {
            // console.log(a.first_name.charCodeAt(0), "char");
            return b.gender.charCodeAt(0) - a.gender.charCodeAt(0);
          });
        } else {
          data.sort((a, b) => {
            return b[sortNM.current] - a[sortNM.current];
          });
        }
      }
      setAllData([...data]);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(allData, "all");
  return (
    <div>
      <div className="controls">
        <div>
          Sort By:{" "}
          <select
            // select dropdown needs both value and onChange
            className="sortby"
            onChange={(e) => {
              //   console.log(e.target.value, "sortNm");
              sortNM.current = e.target.value;
            }}
          >
            <option name="first_name" value="first_name">
              First Name
            </option>
            <option name="gender" value="gender">
              Gender
            </option>
            <option name="age" value="age">
              Age
            </option>
            <option name="tenth_score" value="tenth_score">
              10th Score
            </option>
            <option name="twelth_score" value="twelth_score">
              12th Score
            </option>
          </select>
        </div>
        <div>
          Order:
          <select
            // select dropdown needs both value and onChange
            className="sortorder"
            onChange={(e) => {
              sortAD.current = e.target.value;
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button
          className="sort"
          onClick={() => {
            // console.log(allData, "allDat");
            getData();
          }}
        >
          sort
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
            <th>10th Score</th>
            <th>12th Score</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {/* populate all rows like below: */}
          {allData
            ? allData.map((el) => {
                return (
                  <tr className="row" key={el.id}>
                    <td className="first_name">{el.first_name}</td>
                    <td className="last_name">{el.last_name}</td>
                    <td className="email">{el.email}</td>
                    <td className="gender">{el.gender}</td>
                    <td className="age">{el.age}</td>
                    <td className="tenth_score">{el.tenth_score}</td>
                    <td className="twelth_score">{el.twelth_score}</td>
                    <td className="preferred_branch">{el.preferred_branch}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

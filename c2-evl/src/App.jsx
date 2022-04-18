import { useState } from "react";
import { AddStudent } from "./components/AddStudent";
import { ShowStudents } from "./components/ShowStudents";
import "./App.css";

function App() {
  const [display, setDisplay] = useState(true);
  return (
    <div className="App">
      <button
        className="togglebtn"
        onClick={() => {
          setDisplay(!display);
        }}
      >
        {display ? "Add a new Student" : "go to students list"}
      </button>
      {display ? <ShowStudents /> : <AddStudent />}

      {/* Show either  AddStudent component or ShowStudents dependeing on the above button click  */}
      {/* make sure the table is shown initially, do not show form initially */}
      {/* make sure to show either of them do not both together */}
    </div>
  );
}

export default App;

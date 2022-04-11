// import logo from "./logo.svg";

import { useState } from "react";
import "./App.css";

function App() {
  const [india, setIndia] = useState({
    Score: 76,
    Wicket: 2,
    Ball: 50,
  });
  const updateData = (key, value) => {
    if (key === "Score") {
      setIndia({ ...india, Score: value });
    } else if (key === "Wicket") {
      setIndia({ ...india, Wicket: value });
    } else if (key === "Ball") {
      setIndia({ ...india, Ball: value });
    }
  };
  let over = Math.floor(india.Ball / 6);
  let ball = india.Ball % 6;
  let total = over + "." + ball;

  return (
    <div className="App">
      <h3>India:</h3>
      <div className="banner">
        <div>
          Score:{""}
          <h1 className="scoreCount">
            {
              // show "score" here
              india.Score
            }
          </h1>
        </div>
        <div>
          Wicket:{""}
          <h1 className="wicketCount">
            {
              // show wicket here
              india.Wicket
            }
          </h1>
        </div>

        <div>
          Over:{""}
          <h1 className="overCount">
            {
              // Show Over here in the format: "over.ball" eg: 4.5 means 4th over and 5th ball
              // if 1 more ball is thrown then over is now 5.0
              // you have to write logic to form this string from current ball number.
              total
            }
          </h1>
        </div>
      </div>

      <div className="addScore">
        Add Score
        {/* these buttons should add the respective amount in the score */}
        <button
          className="addScore1"
          onClick={() => {
            if (india.Score <= 100) {
              let score = india.Score + 1;
              // setIndia({ ...india, Score: score });
              updateData("Score", score);
            }
          }}
        >
          Add 1
        </button>
        <button
          className="addScore4"
          onClick={() => {
            if (india.Score <= 100) {
              let score = india.Score + 4;
              // setIndia({ ...india, Score: score });
              updateData("Score", score);
            }
          }}
        >
          Add 4
        </button>
        <button
          className="addScore6"
          onClick={() => {
            if (india.Score <= 100) {
              let score = india.Score + 6;
              // setIndia({ ...india, Score: score });
              updateData("Score", score);
            }
          }}
        >
          Add 6
        </button>
      </div>

      <div className="addWicket">
        Add Wicket
        {/* Increase the count of wicket */}
        <button
          onClick={() => {
            if (india.Score <= 100 && india.Wicket < 12) {
              let wicket = india.Wicket + 1;
              updateData("Wicket", wicket);
            }
          }}
        >
          Add 1 wicket
        </button>
      </div>

      <div className="addBall">
        Add ball
        {/* Increase the total number of balls thrown here. */}
        <button
          onClick={() => {
            if (india.Score <= 100) {
              let ball = india.Ball + 1;
              updateData("Ball", ball);
            }
          }}
        >
          Add 1
        </button>
      </div>

      {/* If score reaches greater than 100, show text "India Won" without quotes in h1 tag with class name 'status' */}
      <h1 className={india.Score > 100 ? "status" : ""}>
        {india.Score > 100 ? "India Won" : ""}
      </h1>
    </div>
  );
}

export default App;

//TODO: STEP 1 - Import the useState hook.

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import BottomRow from "./BottomRow";
import Buttons from "./Buttons";

function App() {
  //TODO: STEP 2 - Establish your application's state with some useState hooks.  You'll need one for the home score and another for the away score.

  const [homeScore, raiseHomeScore] = useState(0);
  const [awayScore, raiseAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [timer, setTimer] = useState(1500);

  const countRef = useRef(timer);
  countRef.current = timer;
  useEffect(() => {
    let countdown = setInterval(() => {
      if (countRef.current % 100 == 0) {
        setTimer(countRef.current - 41);
      } else {
        setTimer(countRef.current - 1);
      }

      if(countRef.current===0){
        clearInterval(countdown);
      }

    }, 1000);
  }, []);

  function timerColor() {
    if (countRef.current <= 0) {
      return "redFont timer";
    } else {
      return "timer";
    }
  }

  function convertText(number) {
    if (number > 0) {
      let stringNum = number.toString();
      let length = stringNum.length;

      if (length == 4) {
        let split = stringNum.split("");

        split.splice(2, 0, ":");
        let returnString = split.join("");

        return returnString;
      } else if (length == 3) {
        let split = stringNum.split("");
        split.splice(0, 0, "0");
        split.splice(2, 0, ":");
        let returnString = split.join("");

        return returnString;
      } else if (length == 2) {
        let split = stringNum.split("");
        split.splice(0, 0, "0");
        split.splice(0, 0, "0");
        split.splice(2, 0, ":");
        let returnString = split.join("");

        return returnString;
      } else if (length == 1) {
        let split = stringNum.split("");
        split.splice(0, 0, "0");
        split.splice(0, 0, "0");
        split.splice(2, 0, ":");
        split.splice(3, 0, "0");
        let returnString = split.join("");

        return returnString;
      }
    } else {
      return "00:00";
    }
  }

  function handleClick(score, context) {
    if (context == "Home") {
      raiseHomeScore(homeScore + score);
    } else if (context == "Away") {
      raiseAwayScore(awayScore + score);
    } else if (context == "Quarter") {
      score == 7 ? (score = 1) : (score = -1);
      if (score == 1 && quarter == 4) {
      } else if (score == -1 && quarter == 1) {
      } else {
        setQuarter(quarter + score);
      }
    }
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Timbers</h2>
            <div className="home__score">{homeScore}</div>
          </div>
          <div className={timerColor()}>{convertText(timer)}</div>
          <div className="away">
            <h2 className="away__name">Thorns</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>

        <BottomRow quarter={quarter} />
      </section>
      <Buttons handleClick={handleClick} />
    </div>
  );
}

export default App;

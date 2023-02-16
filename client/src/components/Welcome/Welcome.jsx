import React from "react";
import { Link } from "react-router-dom";
import Style from "../Welcome/Welcome.module.css";

export default function Welcome() {
  return (
    <div className={Style.Welcome}>
      <label className={Style.lbl}>Recipes Food</label>
      <div className={Style.intro}>
        <p>Get or create a recipes wich more suit to you!</p>
      </div>
      <Link className={Style.text} to="/home">
        Begin your own experience
      </Link>
    </div>
  );
}

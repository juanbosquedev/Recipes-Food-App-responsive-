import React from "react";
import { Link } from "react-router-dom";
import Style from "../Welcome/Welcome.module.css";

export default function Welcome() {
  return (
    <div className={Style.Welcome}>
      <div className={Style.header}>

      <label className={Style.lbl}>Recipes Food</label>
      <Link to="/home" >
        <h1 className={Style.text} >Start</h1>
      </Link>
    </div>
      </div>
  );
}

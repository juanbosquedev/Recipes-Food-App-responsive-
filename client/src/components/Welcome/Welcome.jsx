import React from "react";
import { Link } from "react-router-dom";
import Style from "../Welcome/Welcome.module.css";

export default function Welcome() {
  return (
    <div className={Style.Welcome}>
      <div className={Style.header}>
      <label className={Style.lbl}>Recipes Food</label>
      <div className={Style.intro}>
      <p> Get your best and healthiest meal options. You can search for your favorite recipes by ingredients or type of food, and sort the result of it. In addition, we encourage you to leave us yours to share with our community</p>
      </div>
      <Link className={Style.text} to="/home" >
        Begin your own experience
      </Link>
    </div>
      </div>
  );
}

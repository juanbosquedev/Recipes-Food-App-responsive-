import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_Detail } from "../../Reduxx/Actions/actions";
import Style from "./CardDetail..module.css";

export default function CardDetail(props) {
  const { id } = useParams();
  console.log(id, " soy id");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_Detail(id));
  }, [dispatch, id]);
  const details = useSelector((state) => state.details);
  console.log(details, " soy details");
  return (
    <div>
      <h1 className={Style.title}>{details.name}</h1>

      <div className={Style.main}>
        <div className={Style.contenedor}>
          <img className={Style.img} src={details.image} alt="" />
          <span>
            <p>Diets Type: {details.diets}</p>

            <p>Health Score: {details.healthScore}</p>
          </span>
        </div>

        <div className={Style.details}>
          <div>
            <p>Cooking Steps: </p>
            <p>{details.steps}</p>
          </div>
          <div>
            <p>Summary: </p>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
          </div>
        </div>
      </div>
    </div>
  );
}

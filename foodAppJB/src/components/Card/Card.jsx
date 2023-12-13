import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRecipeCreated } from "../../Reduxx/Actions/actionsCreator";
import PropTypes from "prop-types";
import Style from "./Card.module.css";

export default function Card({
  name,
  diets,
  image,
  id,
  cookingTime,
  servings,
  deleteRecipe,
}) {
  const dispatch = useDispatch();

  return (
    <div className={Style.card}>
      <button
        className={Style.close}
        onClick={() => {
          dispatch(deleteRecipe(id));
          dispatch(deleteRecipeCreated(id));
        }}
      >
        ❌
      </button>
      <div className={Style.image}>
        <img src={image} alt="" />
      </div>
      <div className={Style.bodyCard}>
        <Link style={{ textDecoration: "none" }} to={`/CardDetail/${id}`}>
          <h4 className={Style.title}>{name}</h4>
        </Link>
        <section className={Style.section}>
          <p>
            CookingTime: {cookingTime}
            <br />
            Servings: {servings}
            <br />
            Diet Type: {diets}
          </p>
        </section>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  diets: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cookingTime: PropTypes.number,
  servings: PropTypes.number,
  deleteRecipe: PropTypes.func.isRequired,
};

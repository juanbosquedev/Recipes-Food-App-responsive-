import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { useEffect } from "react";
import {

  get_Diets,
  get_recipe,
  showRecipesCreated,
  dietsFilter,
  ScoreOrder,
  NameOrder
} from "../../Reduxx/Actions/actions";
import SearchBar from "../Search/SearchBar";
export default function Home() {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
 

  
  // useEffect(() => {
    //   dispatch(get_recipe());
    // });
    
    useEffect(() => {
      dispatch(get_Diets());
    },[]);
    const DietsTypes = useSelector((state) => state.diets);
  let s =
    recipes.length !== 0 &&
    recipes.map((el) => {
      return (
        <Card
          name={el.name}
          idOriginal={el.idOriginal}
          image={el.image}
          servings={el.servings}
        />
      );
    });
  function handleSubmit(e) {
    e.preventDefault();
   
  }
  function HandlerDietsFilter(e) {
    dispatch(dietsFilter(e.target.value));
  }
  function handleOrderByScore(e) {
    dispatch(ScoreOrder(e.target.value));
  }
  function handleOrderByName(e){
    dispatch(NameOrder(e.target.value));
  }

  return (
    <div>
      <h1>home</h1>
      {s}
      
   <SearchBar/>
      <div>
        <select defaultValue="default" onChange={(e) => HandlerDietsFilter(e)}>
          <option value="default">opciones de dietas</option>
          {DietsTypes &&
            DietsTypes.map((el) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
        </select> 
    </div>
      
      <div>
        <select defaultValue="default" onChange={(e) => handleOrderByName(e)}>
          orden por nombre
          <option value="ascendente">ascendente</option>
          <option value="descendente">descendente</option>
        </select>
{/*       
        <select defaultValue="default" onChange={(e) => handleOrderByScore(e)}>
          orden por puntaje
          <option value="ascendente">ascendente</option>
          <option value="descendente">descendente</option>
        </select>
      */}
      </div> 
    </div>
  );
}
// [ ] Botones/Opciones para filtrar por por tipo de dieta/ okay onWork
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por health score (nivel de comida saludable).
// [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.
// IMPORTANTE: Dentro de la Ruta Principal se deben mostrar tanto las recetas traidas desde la API como así también las de la base de datos. Debido a que en la API existen alrededor de 5 mil recetas, por cuestiones de performance pueden tomar la simplificación de obtener y paginar las primeras 100.

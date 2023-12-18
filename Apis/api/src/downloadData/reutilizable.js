const getInfo = function (obj) {
  return {
    idOriginal: obj.id,
    name: obj.title,
    summary: obj.summary,
    healthScore: obj.healthScore,
    dishTypes: obj.dishTypes.map((el)=>el),
    steps: obj.analyzedInstructions[0]?.steps.map(el => el.step),
    image: obj.image,
    diets: obj.diets ,
    servings: obj.servings,
    cookingTime: obj.readyInMinutes,
  };
};
module.exports = { getInfo };

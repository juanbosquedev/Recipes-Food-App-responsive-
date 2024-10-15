const {  DietsTypes } = require("../database/connection");


module.exports = async (req, res) => {
  try {


    const diets = await DietsTypes.findAll();

    if (!diets || diets.length === 0) {
      return res.status(404).json({ message: "No diets found" });
    }

    return res.status(200).json(diets);

  } catch (error) {
    
    console.error('Error fetching diets:', error);

    
    return res.status(500).json({
      message: 'An error occurred while fetching diets',
      error: error.message,
    });
  }
};


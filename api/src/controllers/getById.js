module.exports= async (req, res) => {
    const { id } = req.params;
    console.log(id, " soy id")
    if (!id) return res.status(400).send("recipe not found");
    try {
      const data = await Recipe.findOne({
        where: {
          id: { [Op.eq]: id },
        },
      });
      
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).send("serch details error").json(error);
    }
  }
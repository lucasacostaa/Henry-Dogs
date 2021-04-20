const Router = require("express").Router();
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const paginationFunction = async(limit, created, page, name) => {
  const where = !name ? {
    created
  } : {
    name: { 
      [Op.or]: 
        [{[Op.iLike]: "%" + name + "%"},
        {[Op.iLike]: "%" + name},
        {[Op.iLike]: name + "%"},]
      },
    created,
  }

  const totalFound = await Dog.count({where});

  const pages = Math.floor(totalFound / limit);
  const pagesLeft = pages === 0 ? 0 : Math.floor((totalFound - limit * (page + 1)) / limit);
  const currentPage = page;

  /* const paginationData = {
    pages,
    pagesLeft,
    currentPage,
  }; */

  return {pages, pagesLeft, currentPage}
}


Router.get("/", async (req, res) => {
  const { name } = req.query;
  let {
    order = "ASC",
    onlyCreated = false,
    page = 0,
    orderBy = "name"
  } = req.query;

  page = parseInt(page);
  // Created or not filter
  const created = onlyCreated === 'true' ? true : { [Op.or]: [true, false] };

  const limit = 8;

  // Breeds which contains name
  if (name && name.length >= 1) {
    try {
      const dogsFound = await Dog.findAll({
        where: {
          name: { 
            [Op.or]: 
              [{[Op.iLike]: "%" + name + "%"},
              {[Op.iLike]: "%" + name},
              {[Op.iLike]: name + "%"},]
            },
          created,
        },
        limit,
        offset: page * limit,
        order: [[orderBy, order]],
        attributes: ["id","name", "image", "favFlag", "weight_avg"],
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {attributes: []}
        },
      });

      const paginationData = await paginationFunction(limit,created, page, name)

      return res.send({
        paginationData,
        dogsFound,
      });
    } catch (err) {
      return res.status(500).json("Server error");
    }
  }

  // All breeds
  try {
    const dogsFound = await Dog.findAll({
      where: { created },
      limit,
      offset: page * limit,
      order: [[orderBy, order]],
      attributes: ["id","name", "image", "weight_avg"],
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {attributes: []}
      },
    });

    const paginationData = await paginationFunction(limit, created, page)

    return res.send({paginationData, dogsFound});
  } catch (err) {
    return res.status(500).json(err);
  }
});

Router.get("/:idRaza", async (req, res) => {
  try {
    const { idRaza: id } = req.params;

    const response = await Dog.findOne({
      where: { id },
      attributes: ["name", "height", "weight", "life_span", "favFlag", "image"],
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {attributes: []}
      },
    });

    res.send(response);
  } catch (err) {
    return res.sendStatus(500).send("Server error");
  }
});

module.exports = Router;

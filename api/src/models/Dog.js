const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: DataTypes.STRING,
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: DataTypes.STRING,
    favFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    weight_avg: DataTypes.FLOAT
  });
};
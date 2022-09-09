const { DataTypes } = require('sequelize');
const capitalize = require('../capitalize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      set(value) {
        this.setDataValue('id', value+'db');
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('title', capitalize(value))
      }
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    health_score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    preparation: {
      type: DataTypes.TEXT,
      defaultValue: 'La preparacion de la receta no fue especificada'
    }
  },
  {
    timestamps: false
  });
};

const { DataTypes } = require('sequelize');
const { capitalize } = require('../functions')
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
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    analyzedInstructions: {
      type: DataTypes.TEXT,
      defaultValue: 'La preparacion de la receta no fue especificada'
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM6LCpvNpADZtNOENeMttyohIv3ooZUIzWuw&usqp=CAU'
    }
  },
  {
    timestamps: false
  });
};

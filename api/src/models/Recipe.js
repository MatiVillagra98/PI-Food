const { DataTypes } = require('sequelize');
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    health_score: {
      type: DataTypes.INTEGER,
    },
    preparation: {
      type: DataTypes.TEXT
    }
  },
  {
    timestamps: false
  });
};

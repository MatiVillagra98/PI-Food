const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('diet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'Dieta no especificada'
        }
    },
    {
        timestamps: false
    });
};


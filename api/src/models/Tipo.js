const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('tipo', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};
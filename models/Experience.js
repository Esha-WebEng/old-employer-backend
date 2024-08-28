const { DataTypes } = require("sequelize");

module.exports.ExperienceModel = (sequelize) => {
  return sequelize.define(
    "Experience",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fromDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      toDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      current: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};

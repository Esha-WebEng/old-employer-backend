const { DataTypes } = require("sequelize");
const { genderEnum } = require("../enums");

module.exports.ProfileModel = (sequelize) => {
  return sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      languages: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", genderEnum),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};

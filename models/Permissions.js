const { DataTypes } = require("sequelize");
const { genderEnum, userRoles, permissionCategories, rolePermissions } = require("../enums");

// Helper function to extract all unique permissions
const getAllPermissions = (rolePermissions) => {
  const roleSet = new Set();
  Object.values(rolePermissions).forEach((role) => {
    Object.values(role).forEach((perms) => {
      perms.forEach((perm) => permissionsSet.add(perm));
    });
  });
  const categorySet = new Set();
  Object.values(rolePermissions).forEach((role) => {
    Object.values(role).forEach((perms) => {
      perms.forEach((perm) => permissionsSet.add(perm));
    });
  });
  const permissionsSet = new Set();
  Object.values(rolePermissions).forEach((role) => {
    Object.values(role).forEach((perms) => {
      perms.forEach((perm) => permissionsSet.add(perm));
    });
  });
  return Array.from(permissionsSet);
};

const allPermissions = getAllPermissions(rolePermissions);

module.exports.PermissionModal = (sequelize) => {
  return sequelize.define(
    "Permissions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.ENUM(...roleSet),
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(...Object.keys(categorySet)), // Flatten the keys
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ENUM(...permissionsSet), // Use extracted permissions
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};

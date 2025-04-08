const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RoleMenu = sequelize.define(
  "RoleMenu",
  {
    role_id: DataTypes.INTEGER,
    menu_id: DataTypes.INTEGER,
  },
  {
    tableName: "role_menus",
    timestamps: false,
  }
);

module.exports = RoleMenu;

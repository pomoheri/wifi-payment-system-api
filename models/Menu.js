const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Definisikan model Menu
const Menu = sequelize.define(
  "Menu",
  {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    path: DataTypes.STRING,
  },
  {
    tableName: "menus",
    timestamps: true,
  }
);

// Import Role dan RoleMenu setelah define Menu
const Role = require("./Role"); // pastikan path-nya benar
const RoleMenu = require("./RoleMenu"); // pastikan file ini ada

// Relasi
Menu.belongsToMany(Role, {
  through: RoleMenu,
  foreignKey: "menu_id",
  otherKey: "role_id",
});

module.exports = Menu;

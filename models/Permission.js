const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./Role");
const Menu = require("./Menu");

const Permission = sequelize.define(
  "Permission",
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Menu,
        key: "id",
      },
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  }
);

Role.hasMany(Permission, { foreignKey: "role_id" });
Menu.hasMany(Permission, { foreignKey: "menu_id" });
Permission.belongsTo(Role, { foreignKey: "role_id" });
Permission.belongsTo(Menu, { foreignKey: "menu_id" });

module.exports = Permission;

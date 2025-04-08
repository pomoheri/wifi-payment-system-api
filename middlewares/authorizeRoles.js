const { Role, Permission, Menu } = require("../models");

module.exports = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userRoleId = req.user.role_id;
      const role = await Role.findByPk(userRoleId, {
        include: {
          model: Permission,
          include: Menu,
        },
      });

      if (!role) {
        return res.status(403).json({
          status: false,
          message: "Role Not Found",
        });
      }

      const hasPermission = role.Permissions.some(
        (perm) => perm.Menu.name === requiredPermission
      );

      if (!hasPermission) {
        return res.status(403).json({
          status: false,
          message: "Access denied",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: err.message,
      });
    }
  };
};

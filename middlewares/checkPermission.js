const { User, Role, Permission } = require("../models");

module.exports = (permissionName) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id; // dari token JWT
      if (!userId) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
      }

      const user = await User.findByPk(userId, {
        include: {
          model: Role,
          include: {
            model: Permission,
            where: { name: permissionName },
            required: false,
          },
        },
      });

      if (!user || !user.Role || !user.Role.Permissions.length) {
        return res.status(403).json({
          status: false,
          message: "Forbidden: You do not have permission",
        });
      }

      next();
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  };
};

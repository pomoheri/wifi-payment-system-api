const { Op } = require("sequelize");
const Role = require("../models/Role");
const { createRoleValidator } = require("../validators/roleValidator");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json({
      status: true,
      message: "List of roles",
      data: roles,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(422).json({
      status: false,
      message: "Invalid ID",
    });
  }

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: false,
        message: "Role not found",
      });
    }
    res.json({
      status: true,
      message: "Role detail",
      data: role,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const existing = await Role.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({
        status: false,
        message: "Role name already exists",
      });
    }

    const newRole = await Role.create({ name });
    res.status(201).json({
      status: true,
      message: "Role created",
      data: newRole,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(422).json({
      status: false,
      message: "Invalid ID",
    });
  }

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: false,
        message: "Role not found",
      });
    }

    if (name) {
      // Cek apakah ada role lain dengan nama yang sama
      const existing = await Role.findOne({
        where: {
          name,
          id: { [Op.ne]: id }, // NOT this ID
        },
      });

      if (existing) {
        return res.status(409).json({
          status: false,
          message: "Role name already exists",
        });
      }

      role.name = name;
    }

    await role.save();

    res.json({
      status: true,
      message: "Role updated",
      data: role,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(422).json({
      status: false,
      message: "Invalid ID",
    });
  }

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: false,
        message: "Role not found",
      });
    }

    await role.destroy();
    res.json({
      status: true,
      message: "Role deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};

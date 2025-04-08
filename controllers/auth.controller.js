const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { response } = require("../app");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "Username dan Password wajib diisi",
      });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Tidak ditemukan",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: false,
        message: "Username atau Password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET || "secretkey",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      status: true,
      message: "Login Berhasil",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  login,
};

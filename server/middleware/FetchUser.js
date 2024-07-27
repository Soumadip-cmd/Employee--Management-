const express = require("express");
const jwt = require("jsonwebtoken");

const jwt_Secret = process.env.JWT_SECRET;

const FetchUser = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const verify = jwt.verify(token, jwt_Secret);

    req.user = verify.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = FetchUser;

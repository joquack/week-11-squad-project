"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      hashPassword: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.String,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Question, { foreignKey: "userId" });
    User.hasMany(models.Answer, { foreignKey: "userId" });
  };
  return User;
};

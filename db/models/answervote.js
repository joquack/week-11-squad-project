'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerVote = sequelize.define('AnswerVote', {
    vote: DataTypes.BOOLEAN,
    answerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  AnswerVote.associate = function(models) {
    // associations can be defined here
  };
  return AnswerVote;
};
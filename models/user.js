'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations are defined here
        User.hasMany(models.Task)
      }
    }
  });
  return User;
};

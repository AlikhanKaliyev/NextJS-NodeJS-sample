'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.blogs, {foreignKey: 'user_id',as : 'user'}),
      this.hasMany(models.comments, {foreignKey: 'user_id',as : 'author'})
    }
  }
  users.init({
    email: DataTypes.STRING,
    full_name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users , {foreignKey:'user_id', as :'user'}),
      this.belongsTo(models.categories, {foreignKey:'category_id', as:'category'}),
      this.hasMany(models.comments, {foreignKey: 'blog_id',as : 'blog'})
    }
  }
  blogs.init({
    category_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    image: DataTypes.STRING,
    text: DataTypes.STRING,
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blogs',
  });
  return blogs;
};
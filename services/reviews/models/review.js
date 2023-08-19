'use strict';
const {Model,Sequelize} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.STRING
    },
    rating: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    targetId: DataTypes.STRING,
    authorId: DataTypes.STRING,
    targetType: DataTypes.STRING,
    bookingId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
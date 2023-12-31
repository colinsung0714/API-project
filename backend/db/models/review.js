'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User,{
        foreignKey:'userId',
        onDelete:"CASCADE"
      })
      Review.belongsTo(models.Spot,{
        foreignKey:'spotId',
        onDelete:"CASCADE"
      })
      Review.hasMany(models.ReviewImage,{
        foreignKey:'reviewId',
        hooks: true
      })
    }
  }
  Review.init({
    spotId:{
      type: DataTypes.INTEGER,
    },
    userId:{
      type: DataTypes.INTEGER,
    },
    review:{
      type: DataTypes.STRING,
      allowNull:false
    },
    stars:{ 
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
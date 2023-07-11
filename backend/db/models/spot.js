'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking,{
        foreignKey:'spotId',
        hooks:true
      })
      Spot.hasMany(models.Review,{
        foreignKey:'spotId',
        hooks:true
      })
      Spot.hasMany(models.SpotImage,{
        foreignKey:'spotId',
        hooks:true
      })
      Spot.belongsToMany(models.User,{
        through:models.Booking,
        foreignKey:'spotId',
        otherKey:'userId',
      })
      Spot.belongsTo(models.User,{
        foreignKey:'ownerId',
        onDelete:'CASCADE',
        as:'Owner'
      })
    }
  }
  Spot.init({
    ownerId:{
      type: DataTypes.INTEGER,
    },
    address:{
      type: DataTypes.STRING,
      allowNull:false
    },
    city:{
      type:  DataTypes.STRING,
      allowNull:false
    },
    state:{
      type: DataTypes.STRING,
      allowNull:false
    },
    country:{
      type:DataTypes.STRING,
      allowNull:false
    },
    lat:{
      type:DataTypes.DECIMAL(11,7),
      allowNull:false
    },
    lng:{
      type:DataTypes.DECIMAL(11,7),
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    price:{
      type: DataTypes.DECIMAL(10,2),
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};
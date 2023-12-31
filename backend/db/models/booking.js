'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User,{
        foreignKey:'userId',
        onDelete:"CASCADE"
      })
      Booking.belongsTo(models.Spot,{
        foreignKey:'spotId',
        onDelete:"CASCADE"
      })
    }
  }
  Booking.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    spotId:{
      type: DataTypes.INTEGER,
    },
    userId:{
      type: DataTypes.INTEGER,
    },
    startDate:{
      type:DataTypes.DATE,
      allowNull:false
    },
    endDate:{
      type: DataTypes.DATE,
      allowNull:false
    },
    guests:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    accomodation:{
      type: DataTypes.DECIMAL(10,2),
    },
    serviceFee:{
      type: DataTypes.DECIMAL(10,2),
    },
    taxes:{
      type: DataTypes.DECIMAL(10,2),
    },
    total:{
      type: DataTypes.DECIMAL(10,2),
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
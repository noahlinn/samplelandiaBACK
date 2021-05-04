'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_join_sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_join_sample.init({
    userId: DataTypes.INTEGER,
    savedSampleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_join_sample',
  });
  return user_join_sample;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class savedSample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.savedSample.belongsToMany(models.user, { through: 'user_join_sample' })
    }
  };
  savedSample.init({
    sampleId: DataTypes.STRING,
    sampleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'savedSample',
  });
  return savedSample;
};
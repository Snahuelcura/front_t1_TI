'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',

      });
      this.hasMany(models.Comment, {
        foreignKey: 'postId',
      });
    }
  }
  Post.init({
    title:{
      type:DataTypes.STRING,
      allowNull:false
      
    
    },
    content:{type:DataTypes.STRING,
      allowNull:false
      } ,
    image: {
      type: DataTypes.STRING}, 
      
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
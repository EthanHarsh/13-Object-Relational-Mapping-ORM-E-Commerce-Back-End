const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Product = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: Product.product_id
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: Tag.tag_id
      }
    },
    product_tag_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

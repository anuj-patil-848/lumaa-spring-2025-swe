const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); 
const User = require('./User'); 

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }, 
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'tasks',
  timestamps: true,
});

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;

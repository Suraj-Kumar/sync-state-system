module.exports = (sequelize, Sequelize) => {

    return sequelize.define("computer", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },{
        //define options here
        underscored: true,
        sequelize,
        modelName: 'computer',
        paranoid: true,
        freezeTableName: true
    });
  };
module.exports = (sequelize, Sequelize) => {

    return sequelize.define("computer_policy", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      computerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      policyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      }
    },{
        //define options here
        underscored: true,
        sequelize,
        paranoid: true,
        freezeTableName: true
    });
  };
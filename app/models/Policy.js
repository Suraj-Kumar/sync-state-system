module.exports = (sequelize, Sequelize) => {

    return sequelize.define("policy", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      computerName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      allowedIp: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['computer_policy','internal_policy']
      }
    },{
        //define options here
        underscored: true,
        sequelize,
        modelName: 'policy',
        paranoid: true,
        freezeTableName: true
    });
  };
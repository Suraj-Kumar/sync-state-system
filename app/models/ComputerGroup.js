module.exports = (sequelize, Sequelize) => {
    return sequelize.define("computer_group", {
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
      }
    },{
        //options here
        underscored: true,
        sequelize,
        freezeTableName: true
    });
  };
module.exports = (sequelize, Sequelize) => {

    return sequelize.define("scheduled_job", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      triggerTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        enum: ["running","completed"]
      }
    },{
        //define options here
        underscored: true,
        sequelize,
        paranoid: true,
        freezeTableName: true
    });
  };
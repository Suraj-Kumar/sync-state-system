module.exports = (sequelize, Sequelize) => {

    return sequelize.define("sync_data", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      computerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true
      },
      operation:{
        type: Sequelize.STRING,
        enum: ["created","updated", "deleted"]
      },
      status: {
        type: Sequelize.STRING,
        enum: ["pending","synced", "error"]
      },
      description: {
        type: Sequelize.TEXT,
      }  
    },{
        //define options here
        underscored: true,
        sequelize,
        freezeTableName: true
    });
  };
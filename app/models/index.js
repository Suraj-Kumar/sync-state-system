const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const Computer = require("./Computer")(sequelize, Sequelize);
const ComputerGroup = require("./ComputerGroup")(sequelize, Sequelize);
const Policy = require("./Policy")(sequelize, Sequelize);
const ComputerPolicy = require("./ComputerPolicy")(sequelize, Sequelize);
const ScheduledJob = require("./ScheduledJobs")(sequelize, Sequelize);
const SyncData = require("./SyncData")(sequelize,Sequelize);

// add associations

Computer.belongsTo(ComputerGroup, {foreignKey: 'groupId',as :"group"});
ComputerGroup.hasMany(Computer,{foreignKey: 'groupId'});

SyncData.belongsTo(Computer,{constraints: false, foreignKey: "computerId", as: "computer"});
Computer.hasOne(SyncData, {constraints: false, foreignKey: "computerId",  as: "syncData"});

ComputerPolicy.belongsTo(Computer,{constraints: false, foreignKey: "computerId"});
Computer.hasOne(ComputerPolicy, {constraints: false,foreignKey: "computerId", as: "policy"});








module.exports = {Sequelize, sequelize, Computer, ComputerGroup, Policy, ComputerPolicy, ScheduledJob, SyncData};
const { SyncData, Computer, ComputerPolicy, Sequelize } = require("../models");
const {Op} = Sequelize;
const getSyncPendingComputers = async (options) => {
  let result = await SyncData.findAll({
    where: { [Op.or]: [{ status: "pending" }, { status: "error" }] },
    attributes: { exclude: ["deletedAt"] },
    include: [
      { model: Computer, include: [{ model: ComputerPolicy, as: "policy" }], paranoid: false, as :"computer" },
    ],
    ...options,
  });
  return result.map((row) => {
    return row.toJSON();
  });
};

const createSyncData = async (data, options) => {
  const syncData = await SyncData.create(data, {
    transaction: options.transaction,
  });
  return syncData;
};
const updateSyncData = async (data, filters, options) => {
  return await SyncData.update(data, {
    where: filters,
    transaction: options?.transaction||null ,
  });
};

const deleteSyncData = async (filters, options) => {
  return await SyncData.destroy({
    where: filters,
    transaction: options.transaction,
  });
};

const upsert = async (data,options)=>{
  return await SyncData.upsert(data, {
    transaction: options?.transaction || null,
  });
}

module.exports = {
  getSyncPendingComputers,
  createSyncData,
  updateSyncData,
  deleteSyncData,
  upsert
};

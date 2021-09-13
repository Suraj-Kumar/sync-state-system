const policyRepository = require("../repositories/policy");
const { sequelize } = require("../models");
const getPolicies = async (filters) => {
  return await policyRepository.getPolicies(filters);
};
const createPolicy = async (data) => {
  return await sequelize.transaction(async (t) => {
    return await policyRepository.createPolicy(data, { transaction: t });
  });
};
const putPolicy = async (data, filter) => {
  return await sequelize.transaction(async (t) => {
    return await policyRepository.putPolicy(data, filter, { transaction: t });
  });
};
const deletePolicy = async (filter) => {
  return await sequelize.transaction(async (t) => {
    return await policyRepository.deletePolicy(filter, { transaction: t });
  });
};
module.exports = { createPolicy, getPolicies, putPolicy, deletePolicy };

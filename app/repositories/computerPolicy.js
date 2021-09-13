const { ComputerPolicy } = require("../models");

const getPolicy = async (filters) => {
  return await ComputerPolicy.findAll({
    where: filters,
    attributes: { exclude: ["deletedAt"] },
  });
};

const createPolicy = async (data, options) => {
  const computerPolicy = await ComputerPolicy.create(data, {
    transaction: options.transaction,
  });
  return computerPolicy.toJSON();
};

const deleteComputerPolicy = async (filters, options) => {
  return await ComputerPolicy.destroy({
    where: filters,
    transaction: options.transaction,
  });
};

module.exports = {
  createPolicy,
  getPolicy,
  deleteComputerPolicy,
};

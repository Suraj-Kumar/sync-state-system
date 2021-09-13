const { Policy } = require("../models");
const { InvalidGroupError, DuplicateRecordError } = require("../errors");
const getPolicies = async (filters) => {
  return await Policy.findAll({
    where: filters,
    attributes: { exclude: ["deletedAt"] },
  });
};

const createPolicy = async (data, options) => {
  try {
    const policy = await Policy.create(data, {
      transaction: options.transaction,
    });
    return policy.toJSON();
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      throw new DuplicateRecordError(error);
    }
    throw error;
  }
};

const putPolicy = async (data, filters, options) => {
  return await Policy.update(data, {
    where: filters,
    transaction: options.transaction,
  });
};

const deletePolicy = async (filters, options) => {
  return await Policy.destroy({
    where: filters,
    transaction: options.transaction,
  });
};

module.exports = {
createPolicy,
  getPolicies,
  putPolicy,
  deletePolicy,
};

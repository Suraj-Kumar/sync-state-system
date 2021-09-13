const { Computer, ComputerGroup, Sequelize,sequelize } = require("../models");
const { QueryTypes } = Sequelize;
const { InvalidGroupError, DuplicateRecordError } = require("../errors");
const getComputers = async (filters, options) => {
  return await Computer.findAll({
    where: filters,
    attributes: options?.attribute?options.attribute:  { exclude: ["deletedAt"] },
    include: options?.include?options.include : [
      { model: ComputerGroup, as: "group", attributes: ["id", "name"] },
    ],
  });
};

const createComputer = async (data, options) => {
  try {
    const computer = await Computer.create(data, {
      transaction: options.transaction,
    });

    return computer.toJSON();
  } catch (error) {
    if (error.name == "SequelizeForeignKeyConstraintError") {
      throw new InvalidGroupError(error);
    }
    if (error.name == "SequelizeUniqueConstraintError") {
      throw new DuplicateRecordError(error);
    }
    throw error;
  }
};

const putComputer = async (data, filters, options) => {
  return await Computer.update(data, {
    where: filters,
    transaction: options.transaction,
  });
};

const deleteComputer = async (filters, options) => {
  return await Computer.destroy({
    where: filters,
    transaction: options.transaction,
  });
};

const getSyncDataSummary = async () => {
  const query = `select count(c.id) as totalComuter, count(DISTINCT sp.computer_id) as pendingSync, c.group_id as groupId, cg.name,GROUP_CONCAT( c.id) as computerIds from computer c left join computer_group cg on c.group_id = cg.id left join sync_data sp on c.id = sp.computer_id where c.deleted_at is null group by c.group_id`;
  return await sequelize.query(query, { raw: true, type: QueryTypes.SELECT });
};

module.exports = {
  createComputer,
  getComputers,
  putComputer,
  deleteComputer,
  getSyncDataSummary,
};

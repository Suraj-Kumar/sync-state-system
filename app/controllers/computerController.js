const computerService = require("../services/computerService");
const { ResourseNotFoundError } = require("../errors");
const { runScheduledJob } = require("../services/scheduledJobService");
const getComputerById = async (req, res, next) => {
  try {
    const computerId = req.params.computerId;
    let computer = await computerService.getComputers({ id: computerId });
    if (!computer.length) {
      throw new ResourseNotFoundError();
    }
    res.status(200).json(...computer);
  } catch (error) {
    return next(error);
  }
};

const queryComputers = async (req, res) => {
  try {
    const filters = req.query;
    let computer = await computerService.getComputers(filters);
    res.status(200).json(computer);
  } catch (error) {
    return next(error);
  }
};

const createComputer = async (req, res, next) => {
  try {
    let computerObj = {
      name: req.body.name,
      ip: req.body.ip,
      groupId: req.body.groupId,
    };
    let computer = await computerService.createComputer(computerObj);
    runScheduledJob();
    res.status(201).json(computer);
  } catch (e) {
    return next(e);
  }
};

const updateComputer = async (req, res, next) => {
  try {
    const filters = { id: req.params.computerId };
    let data = req.body;
    let computerObj = {};
    data.name && (computerObj.name = data.name);
    data.ip && (computerObj.ip = data.ip);
    data.groupId && (computerObj.groupId = data.groupId);
    let rowAffected = await computerService.putComputer(computerObj, filters);
  
    if (rowAffected[0]) {
      runScheduledJob();
      res.sendStatus(204);
    } else {
      throw new ResourseNotFoundError();
    }
  } catch (error) {
    return next(error);
  }
};

const deleteComputer = async (req, res, next) => {
  try {
    const filters = { id: req.params.computerId };
    let rowAffected = await computerService.deleteComputer(filters);
    if (rowAffected) {
      runScheduledJob();
      res.sendStatus(204);
    } else {
      throw new ResourseNotFoundError();
    }
  } catch (error) {
    return next(error);
  }
};
// for testing 
const getSyncData = async (req, res) => {
  let data = await runScheduledJob();
  console.log("data", data);
  res.status(200).json(data);
};

const getSyncStatus = async (req, res, next)=>{
  try {

    let data = await computerService.getSyncStatus();
    res.status(201).json(data);
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  getComputerById,
  queryComputers,
  createComputer,
  updateComputer,
  deleteComputer,
  getSyncData,
  getSyncStatus
};

const { ScheduledJob } = require("../models");
const getJob = async (filters) => {
  //filters.deletedAt=  filters.deletedAt? filters.deletedAt: null;
  return await ScheduledJob.findAll({
    where: filters,
    attributes: { exclude: ["deletedAt"] },
  });
};

const createNewJob = async () => {
    const job = await ScheduledJob.create({
        triggerTime: new Date().getTime(),
        status:"running"
    });
    return job;
}



module.exports = {
  createNewJob,
  getJob
}

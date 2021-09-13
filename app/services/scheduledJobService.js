const { getJob, createNewJob } = require("../repositories/scheduledJob");
const syncData = require("../repositories/syncData");
const { sequelize } = require("../models");
const {
  createThirdPartyComputerPolicy,
  updateThirdPartyComputerPolicy,
  deleteThirdPartyComputerPolicy,
} = require("../config/httpClient");
const { createPolicy } = require("../repositories/computerPolicy");

const runScheduledJob = async () => {
  const batchSize = 5;
  let activeJob = await getJob({ status: "running" });
  if (activeJob.length) {
    console.log("skiping the job as previous job is running");
    return;
  }
  let job = await createNewJob();
  try {
    await syncDataInBatch(batchSize);
    job.status = "completed";
    job.save();
  } catch (error) {
    console.log("error while processing job", error);
    job.status = "failed";
    job.save();
  }
};

const syncDataInBatch = async (batchSize) => {
  let offset = 0;
  let pendingSyncTask = [];
  do {
    pendingSyncTask = await syncData.getSyncPendingComputers({
      limit: batchSize,
      offset: offset,
    });
    await syncPendingData(pendingSyncTask);
    offset = offset + batchSize;
  } while (pendingSyncTask.length);
};

const syncPendingData = async (pendingTasks) => {
  if (pendingTasks.length) {
    const tasks = pendingTasks.map((task) => {
      if (task.operation == "created") {
        return createThirdPartyComputerPolicy(
          {
            computerName: task.computer.name,
            allowedIp: task.computer.ip,
            type: "computer_policy",
          },
          task
        );
      }
      if (task.operation == "updated") {
        return updateThirdPartyComputerPolicy(
          {
            computerName: task.computer.name,
            allowedIp: task.computer.ip,
            type: "computer_policy",
          },
          task
        );
      }
      if (task.operation == "deleted") {
        return deleteThirdPartyComputerPolicy(
          { policyId: task.computer.policy.id },
          task
        );
      }
    });

    await Promise.allSettled(tasks)
      .then((results) => {
        console.log("batch completed successfully", results);
        results.forEach((element) => {
          if (element.status == "fulfilled") {
            handleSuccessResponse(element.value);
          } else if ((element.status = "rejected")) {
            handleErrorResponse(element.reason);
          }
        });
      })
      .catch((e) => {
        console.log("error response", results);
      });
  }
};

const handleSuccessResponse = async (response) => {
  const { metadata, thirdPartyResponse } = response;
  try {
    await sequelize.transaction(async (t) => {
      if (metadata.operation == "created") {
        await createPolicy(
          {
            computerId: metadata.computer.id,
            policyId: thirdPartyResponse.id,
          },
          { transaction: t }
        );
      }
      //  in case ofsuccessfull created/updated/deleted delete the sync task from db
      await syncData.deleteSyncData({ id: metadata.id }, { transaction: t });
    });
  } catch (e) {
    console.log(e);
  }
};

const handleErrorResponse = async (response) => {
  // handle error based on the business use case.
  const { metadata, error } = response;
  if (metadata.operation == "updated" && error.code == "RESOURCE_NOT_FOUND") {
    // 3rd party policy not present, we can either delete the computer policy or add the 3rd party policy
  }
  if (metadata.operation == "created" && error.code == "CONFLICT") {
    // 3rd party policy already created from external source. we can get the 3p policyId and update computer policy
  }
  await syncData.updateSyncData(
    { description: JSON.stringify(error), status: "error" },
    { id: metadata.id }
  );
};

module.exports = { runScheduledJob };

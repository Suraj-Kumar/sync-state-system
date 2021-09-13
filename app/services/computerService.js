const computerRepository = require("../repositories/computer");
const syncData = require("../repositories/syncData");
const {sequelize, ComputerPolicy} = require("../models");
const models = require("../models");
const getComputers = async (filters)=>{
   return await computerRepository.getComputers(filters);
};
const createComputer = async (data)=>{
       return  await sequelize.transaction(async t => {
        let computer = await computerRepository.createComputer(data, {transaction : t});
        await syncData.createSyncData({
            computerId : computer.id,
            operation:"created",
            status: "pending"
        },{transaction : t});
        return computer;
     })
    };
const putComputer =async  (data, filter)=>{
    return  await sequelize.transaction(async t => {
        const computer= await computerRepository.putComputer(data,filter, {transaction : t});
        await syncData.upsert({
            operation: "updated",
            computerId: Number(filter.id),
            status: "pending"
        },{transaction : t});
        return computer;
     });
}
const deleteComputer = async (filter)=>{
    return  await sequelize.transaction(async t => {
        let rowAffected= await computerRepository.deleteComputer(filter, {transaction : t});
        await syncData.upsert({
            operation: "deleted",
            computerId: Number(filter.id),
            status: "pending"
        },{transaction : t});
        return rowAffected;
     });
}

const getSyncStatus = async()=>{
        let summary = await computerRepository.getSyncDataSummary();
        console.log(summary);
        let response = await summary.map( async groupSummary=>{
            let syncedComputers =groupSummary.totalComuter-groupSummary.pendingSync;
            let syncedPercentage = (syncedComputers/groupSummary.totalComuter)*100;
            let computers = await computerRepository.getComputers({id:groupSummary.computerIds.split(",") },{
                include: [{model: ComputerPolicy, as: "policy" },{model: models.SyncData, as :"syncData" }]
            });
            let errors = computers.map(comp=>{
                if(comp?.syncData?.description){
                    return {
                        computerId: comp.id,
                        error: comp.syncData.description
                    }
                }
                
            }).filter(error=>error);
            console.log(errors);
            return {
                computerGroup: groupSummary.name,
                syncedComputers,
                totalComuters : groupSummary.totalComuter,
                syncedPercentage,
                computers : computers.map(comp=>({
                    id: comp.id,
                    name: comp.name,
                    policyId: comp.policy?comp.policy.id: null
                })),
                errors
            }

        })

        return await Promise.all(response);
       
}

module.exports={createComputer, getComputers, putComputer, deleteComputer, getSyncStatus} 
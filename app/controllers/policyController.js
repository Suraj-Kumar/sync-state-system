const {ResourseNotFoundError} = require("../errors");
const policyService = require("../services/policyService");

const erraticApi= ()=>{
  // part of requirement
  let random =Math.random();
  if(random < 0.1){
    throw new Error("Internal server error");
  }
}

const getPolicyById = async (req, res, next) => {
  try{
       
    erraticApi();
    const policyId =  req.params.policyId;
    let policy = await policyService.getPolicies({id: policyId});
    if(!policy.length){
      throw new ResourseNotFoundError();
    }
    res.status(200).json(...policy);
  }catch(error){
     return next(error)
  }
  };
  
  const queryPolicies = async (req, res, next) => {
    try{
      erraticApi();
      const filters =  req.query;
      let policies = await policyService.getPolicies(filters);
      res.status(200).json(policies);
    }catch(error){
       return next(error)
    }
  };
  
  const createPolicy = async (req, res, next) => {
    try{
      erraticApi();
      let policyObj = {
        computerName: req.body.computerName,
        allowedIp : req.body.allowedIp,
        type: req.body.type,
    
      };
      let policy = await policyService.createPolicy(policyObj);
      res.status(201).json(policy);
      }catch(error){
        return next(error);
      }
  };
  
  const updatePolicy = async (req, res, next) => {
    try{
      erraticApi();
      const filters = {id: req.params.policyId};
      let data = req.body;
      let policyObj = {}
      data.computerName && (policyObj.computerName = data.computerName);
      data.allowedIp && (policyObj.allowedIp = data.allowedIp);
      data.type && (policyObj.type = data.type);
      let rowAffected = await policyService.putPolicy(policyObj, filters);
      if(rowAffected[0]){
        res.sendStatus(204);
      }else{
        throw new ResourseNotFoundError();
      }
      
    }catch(error){
       return next(error)
    }
  };
  
  const deletePolicy = async (req, res, next) => {
    try{
      erraticApi();
      const filters = {id: req.params.policyId};
      let rowAffected = await policyService.deletePolicy(filters);
      if(rowAffected){
        res.sendStatus(204);
      }else{
        throw new ResourseNotFoundError();
      }
      
    }catch(error){
       return next(error)
    }
  };
  
  module.exports = {
    getPolicyById,
    queryPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
  };
  
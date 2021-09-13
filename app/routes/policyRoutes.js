const policyrouter = require("express").Router();
const { Validator } = require("express-json-validator-middleware");
const {policySchema} = require("../schemas/policySchema");
const {validate,  ValidationError } = new Validator();
const {createPolicy,deletePolicy,getPolicyById,queryPolicies,updatePolicy} = require("../controllers/policyController")
policyrouter.get("/:policyId",getPolicyById);
policyrouter.get("/",queryPolicies);
policyrouter.post("/",validate({ body: policySchema}), createPolicy);
policyrouter.put("/:policyId",updatePolicy);
policyrouter.delete("/:policyId",deletePolicy);

module.exports = policyrouter;
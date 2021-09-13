const computerRouter = require("express").Router();
const { Validator } = require("express-json-validator-middleware");
const {validate,  ValidationError } = new Validator();
const {createComputer,deleteComputer,getComputerById,queryComputers,updateComputer, getSyncData, getSyncStatus} = require("../controllers/computerController")
const computerSchema = require("../schemas/computerSchema");


//testing to trigger 
computerRouter.get("/sync/data",getSyncData);
computerRouter.get("/syn-status",getSyncStatus);

computerRouter.get("/:computerId",getComputerById);
computerRouter.post("/",validate({ body: computerSchema }), createComputer);
computerRouter.put("/:computerId",updateComputer);
computerRouter.delete("/:computerId",deleteComputer);


computerRouter.get("/",queryComputers);


module.exports = computerRouter
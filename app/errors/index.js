const InvalidGroupError = require("./InvalidGroupError");
const InternalServerError = require("./InternalServerError");
const DuplicateRecordError = require("./DuplicateRecordError");
const ResourseNotFoundError = require("./ResourseNotFoundError");
const {ValidationError  } = require("express-json-validator-middleware");


const errorHandler = (error, request, response)=>{
   let  status= error.status;
   
    if (error instanceof ValidationError) {
        status = 400;
        
      }else if(!status){
        status = 500;
        error = new InternalServerError();
      }
      delete error.original;
      response.status(status).json(error);
}

module.exports = { InvalidGroupError,errorHandler,DuplicateRecordError,ResourseNotFoundError
 };

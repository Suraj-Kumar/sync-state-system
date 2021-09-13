const express = require("express");
const cors = require("cors");
const db = require("./models");
const {errorHandler} = require("./errors");

const app = express();
const {computerRouter,policyRouter} = require("./routes");

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


// use routes
app.use("/v1/computers",computerRouter);
app.use("/v1/policies",policyRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  db.sequelize.sync({force:false});
  });

  //format and log response
  app.use((request, response, next) => {
    
   // console.log("returning response", response.status);
    //errorHandler(error, request, response);
    next(); 
  });


  // Error handler
  app.use((error, request, response, next) => {
    
    console.error("error", error);
    errorHandler(error, request, response);
    next(error);
  });

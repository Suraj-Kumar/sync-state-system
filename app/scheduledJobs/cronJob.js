const cron = require('node-cron');
const {runScheduledJob} = require("../services/scheduledJobService");



cron.schedule('* 5 * * *', async () => {
   try{
    console.log("Starting cron job");
    await runScheduledJob();
   }catch(error){
       console.log("error while running the job",error);
   }
  });
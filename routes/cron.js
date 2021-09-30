var CronJob = require('cron').CronJob;
let i=0,j=i%60;
var job = new CronJob('* * * * * *', function() {
    i++;
  }, null, true, 'America/Los_Angeles');
  job.start();

let job2=new CronJob('* * * * *', function() {
}, null, true, 'America/Los_Angeles')
job2.start();
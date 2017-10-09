const schedule = require('node-schedule');

schedule.scheduleJob('0 36 * * * *', () => {
    console.log('fucker you');
});
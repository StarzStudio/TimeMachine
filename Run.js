const async = require('async');
var schedule = require('node-schedule');
const execSync = require('child_process').execSync;
const domain = require('domain').create();
const fs = require('fs');
let sSettingFileName = "";

function ProcessSettings() {
    sSettingFileName = process.argv[2] || '';
    let oSetting = JSON.parse(fs.readFileSync(sSettingFileName, 'utf8'));
    let aScheduledCommands = [];

    let aCommands = oSetting["commands"];
    let aSchedules = oSetting["schedule"];

    for (let i in aSchedules) {
        let oScheduledCommands = {
            schedule: "",
            commands : []
        };
        oScheduledCommands["schedule"] = aSchedules[i];
        oScheduledCommands["commands"] = aCommands;
        aScheduledCommands.push(oScheduledCommands);
    }

    return aScheduledCommands;
}

function SetupTasksTimeline(aScheduledCommands) {

    for (var i in aScheduledCommands)  {
        SetupScheduledTasks(aScheduledCommands[i]);
    }

}

function SetupScheduledTasks(oScheduledCommands) {

    let sScheduleTime = oScheduledCommands["schedule"];
    let aCommands = oScheduledCommands["commands"];

    schedule.scheduleJob(sScheduleTime, function(fireDate){
        console.log('The task: \'' + sSettingFileName +  '\' was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
        RunAllTasks();
    });

    function AsyncExec(sCommand, callback) {
        console.log("The command: " + sCommand + " is executed at " + new Date());
        execSync(sCommand, {stdio: [process.stdin, process.stdout, process.stderr]});
        if (typeof callback !== 'undefined') {
            callback();
        }
    }

    function RunAllTasks() {
        async.eachSeries(aCommands, AsyncExec, function (err) {
            if (err) {
                console.log("  Error happened in function: 'RunAllTasks', \n" + err);
            } else {
                console.log("  Successfully finish running all tasks scheduled at " + sScheduleTime + "\n");
            }
        });
    }

}

function Start(){

    SetupTasksTimeline(ProcessSettings());
    return;
}

domain.run(function () {
    Start();
});

domain.on('error', function(err){
    console.log("Unexpected error happens : " + err);
});


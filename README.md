## Introduction

A program can run commands at scheduled times, driven by the predefined setting file in JSON.

## Usage

Run a task file

```
Node Run.js "TaskFileName"
```

## Setting file format

```json
{
  "schedule" : [
    "0 15 13 * * *",
    "0 16 13 * * *"
  ],
  "commands": [
    "ls -la",
    "echo hello"
  ]
}
```

#### schedule time format:

This project uses <https://github.com/node-schedule/node-schedule> to perform time-schedule functionality and thus uses its time format, which is defined as below:
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```
(Please check out "node-schedule" github page for more details)

#### commands time format:

Same as the bash command.
Note the default root path is ./TimeMachine


## Contact

For any questions about the program usage or the general design, please email to developer.xingzhou@gmail.com.

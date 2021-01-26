/*
* 定时任务 独立进程执行
* */

require('colors');
require('./global');

const updateDate = require("./settings/updateDate");

const jobs = require('./timedTasks/scheduleJob');
const timedTasks = require('./timedTasks/timedTasks');

const run = async () => {
  // 以下任务固定时间执行
  jobs.updateActiveUsers(updateDate.updateActiveUsersCronStr);
  jobs.clearForumAndThreadPostCount();
  jobs.shop();
  jobs.backupDatabase();
  jobs.moveRecycleMarkThreads();
  jobs.clearFileCache();
  jobs.preparationForumCheck();
  // 以下任务定时执行
  await timedTasks.cacheActiveUsers();
  await timedTasks.clearTimeoutPageCache();
  await timedTasks.updateRecommendThreads();
  await timedTasks.clearResourceState();
  await timedTasks.updateAllForumLatestThread();
  await timedTasks.updateForumsMessage();
};


run()
  .then(() => {
    console.log(`定时任务启动成功`.green);
  })
  .catch(err => {
    console.log(`定时任务启动失败`.red);
    console.log((err.stack || err.message || err).red);
  })

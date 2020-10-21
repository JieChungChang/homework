const processA = {
  name: 'processA',
}
const processB = {
  name: 'processB',
}
const resourceA = {
  name: 'resourceA',
  lock: false,
  count: 0,
}
const resourceB = {
  name: 'resourceB',
  lock: false,
  count: 0,
}

async function delay(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(function() { 
      resolve();
    }, sec * 1000);
  });
}

async function getLock(process, resource) {
  await delay(2);
  if (resource.lock) {
    console.log(`${process.name} get lock from ${resource.name} fail, ${resource.name} already locked!`);
    return false;
  } else {
    resource.lock = true;
    console.log(`${process.name} get lock from ${resource.name} success!`);
    return true;
  }
}

async function resourceTask (process, resource) {
  await delay(2);
  resource.count +=1;
  console.log(`${process.name} call ${resource.name} result ${resource.count}!`);
}

// will cause deadlock
async function processATasks() {
  // get resource A lock
  let getResourceALockResult = false;
  while(!getResourceALockResult) {
    getResourceALockResult = await getLock(processA, resourceA);
  }

  // do resource A task
  await resourceTask(processA, resourceA);

  // get resource B lock
  let getResourceBLockResult = false;
  while(!getResourceBLockResult) {
    getResourceBLockResult = await getLock(processA, resourceB);
  }

  // release resource A lock 
  resourceA.lock = false;

  // do resource B task
  await resourceTask(processA, resourceB);
}

async function processBTasks() {
  // get resource B lock
  let getResourceBLockResult = false;
  while(!getResourceBLockResult) {
    getResourceBLockResult = await getLock(processB, resourceB);
  }
  // do resource B task
  await resourceTask(processB, resourceB);

  // get resource B lock
  let getResourceALockResult = false;
  while(!getResourceALockResult) {
    getResourceALockResult = await getLock(processB, resourceA);
  }

  // release resource A lock 
  resourceB.lock = false;

  // do resource B task
  await resourceTask(processB, resourceA);
}

async function deadlockTasks() {
  processATasks();
  processBTasks();
}

// will not cause deadlock
async function processAReleaseLockFirstTasks() {
  // get resource A lock
  let getResourceALockResult = false;
  while(!getResourceALockResult) {
    getResourceALockResult = await getLock(processA, resourceA);
  }

  // do resource A task
  await resourceTask(processA, resourceA);

  // release resource A lock 
  resourceA.lock = false;

  // get resource B lock
  let getResourceBLockResult = false;
  while(!getResourceBLockResult) {
    getResourceBLockResult = await getLock(processA, resourceB);
  }

  // do resource B task
  await resourceTask(processA, resourceB);
}

async function processBReleaseLockFirstTasks() {
  // get resource B lock
  let getResourceBLockResult = false;
  while(!getResourceBLockResult) {
    getResourceBLockResult = await getLock(processB, resourceB);
  }
  // do resource B task
  await resourceTask(processB, resourceB);

  // release resource B lock 
  resourceB.lock = false;

  // get resource B lock
  let getResourceALockResult = false;
  while(!getResourceALockResult) {
    getResourceALockResult = await getLock(processB, resourceA);
  }

  // do resource B task
  await resourceTask(processB, resourceA);
}

async function tasks() {
  processAReleaseLockFirstTasks();
  processBReleaseLockFirstTasks();
}

// deadlockTasks();
// tasks();
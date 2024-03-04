import * as core from '@actions/core';
import retry from 'async-retry';

import axios from 'axios';

const healthUrl = core.getInput('url');

const checkHealth = async (bail: any) => {
  console.log('Making a call to server with url', healthUrl);
  const res = await axios.get(healthUrl);
  console.log('res', res.data);

  if (res.status === 200) {
    return res.data;
  }

  if (res.status === 404) {
    bail(new Error('Server not up'));
  }

  return bail(new Error(`unknown error: ${res.status}`));
};

const retries = Number(core.getInput('retries'));
const factor = Number(core.getInput('factor'));
const maxTimeout = Number(core.getInput('wait_seconds')) * 60 * 1000;

retry(checkHealth, { retries, factor, maxTimeout })
  .then((value) => {
    console.log(value);
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

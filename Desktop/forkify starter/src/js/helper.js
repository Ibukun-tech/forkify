import { async } from 'regenerator-runtime';
// import API_URL from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJson = async function (url) {
  try {
    console.log(url);
    const res = await Promise.race([fetch(url), timeout(40)]);
    if (!res.ok) {
      throw new Error('we have a big problem here');
    }
    const data = await res.json();
    // console.log(data);
    // if (data.length === 0) {
    //   throw new Error('What you search for we do not have sir/ma');
    //
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
export const upLoadDatabase = async function (url, dataGoingToBeStored) {
  try {
    const sentData = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataGoingToBeStored),
    });
    const req = await Promise.race([sentData, timeout(40)]);
    console.log(req);
    const data = await req.json();
    console.log(data);
    if (!req.ok) {
      throw new Error(`${data.message}${req.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

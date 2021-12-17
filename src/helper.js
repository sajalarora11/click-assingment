const clicksData = require("./clicks.json");

/**
 * This function creates a key for a map that combines ip, date and hour in the form of ip-date-hour
 * @param {*} ip
 * @param {*} dateString
 * @returns String
 */
function createIPKey(ip, dateString) {
  if (!ip) throw new Error("IP address is required");
  if (!dateString) throw new Error("dateString is required");

  const [date, time] = dateString.split(" ");
  if (!date || !time)
    throw new Error(
      "Date string is invalid, make sure the date strings is of format dd/mm/yyyy hour:min:ms"
    );
  const hour = time.split(":")[0];
  return `${ip}-${date}-${hour}`;
}

/**
 * Function to return the object that contains ip-date-hour as key and corresponding amount as value.
 * @param {*} clicks
 * @returns object
 */
function createIPMap(clicks) {
  if (!clicks || clicks.length === 0)
    throw new Error("clicks array should not be empty");

  /*
    Formation of a map that holds the maximum amount
    corresponding to each ip address for one hour period
    which suffice first condition of problem statement
  */
  const maxAmountObject = {};
  for (const click of clicks) {
    const key = createIPKey(click.ip, click.timestamp);
    if (!maxAmountObject[key]) maxAmountObject[key] = click.amount;
    else {
      if (maxAmountObject[key] < click.amount)
        maxAmountObject[key] = click.amount;
    }
  }

  /*
    Now the object is created to find the earliest hour
    which suffice second condition of problem statement
  */
  const minHourObject = {};
  for (let key in maxAmountObject) {
    const [ip, date, hour] = key.split("-");
    const numHour = parseInt(hour);
    const k = `${ip}-${date}`;
    if (!minHourObject[k]) {
      minHourObject[k] = numHour;
    } else {
      if (minHourObject[k] > numHour) {
        minHourObject[k] = numHour;
      }
    }
  }

  /*
    Based on the above two maps, the final map can be created
    that will contain all the unique ip address adn time period
    which suffice both (first and second) conditions of problem statement
  */
  const resultObject = {};
  for (let key in minHourObject) {
    const hourStr = String(minHourObject[key]);
    let k = `${key}-${hourStr.length === 1 ? "0" + hourStr : hourStr}`;
    resultObject[k] = maxAmountObject[k];
  }
  return resultObject;
}

/**
 * Function to eliminate all the clicks that occurs more than 10 times
 * @returns array
 */
function eliminatedClicks(clickArray) {
  let clicks;
  if (clickArray) clicks = clickArray;
  else clicks = clicksData;

  if (clicks.length === 0) throw new Error("No clicks data in clicks.json");

  // Gets all the frequencies of IPs in a map
  const freqMap = {};
  for (let click of clicks) {
    if (click.ip in freqMap) freqMap[click.ip]++;
    else freqMap[click.ip] = 1;
  }
  // only clicks with frequency less than or equal to 10 will be returned
  return clicks.filter((i) => freqMap[i.ip] <= 10);
}

module.exports = {
  createIPMap,
  createIPKey,
  eliminatedClicks,
};

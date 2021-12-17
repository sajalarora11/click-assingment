const fs = require("fs");
const { eliminatedClicks, createIPMap, createIPKey } = require("./helper");

function main() {
  const clicks = eliminatedClicks();
  if (clicks.length < 1) throw new Error("No clicks to process");

  const map = createIPMap(clicks);
  if (Object.keys(map).length === 0) throw new Error("Invalid click data ");

  let result = [];
  for (let click of clicks) {
    let key = createIPKey(click.ip, click.timestamp);
    
    // if the key value pair matches, the result is pushed in array
    if (map[key] && map[key] === click.amount) result.push(click);
  }
  fs.writeFile("resultset.json", JSON.stringify(result), (error) => {
    if (error) throw error;
  });
  return result;
}

main();

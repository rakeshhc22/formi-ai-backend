const fs = require("fs");
const csv = require("csv-parser");

async function readAndFilterCSV(path, filters = {}) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => {
        let isValid = true;
        for (const key in filters) {
          if (data[key] !== filters[key]) isValid = false;
        }
        if (isValid) results.push(data);
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

module.exports = {
  readAndFilterCSV,
};

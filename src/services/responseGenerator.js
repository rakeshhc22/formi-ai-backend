// src/services/responseGenerator.js

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Load the CSV file and convert it to a response map
function loadCSVData() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "..", "data", "activities.csv");
    const responseMap = {};

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const query = row.query?.toLowerCase().trim();
        if (query) {
          responseMap[query] = row.response;
        }
      })
      .on("end", () => {
        console.log("✅ CSV data loaded.");
        resolve(responseMap);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Returns a response based on the query
async function getResponseForQuery(query) {
  try {
    const data = await loadCSVData();
    const cleanedQuery = query.toLowerCase().trim();
    return data[cleanedQuery] || "Sorry, I couldn't find a response for that.";
  } catch (error) {
    console.error("❌ Error in getResponseForQuery:", error.message);
    return "An error occurred while processing your request.";
  }
}

module.exports = {
  getResponseForQuery,
};

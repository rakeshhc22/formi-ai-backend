const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

// Token limit: very rough estimate (can refine with tokenizer later)
function estimateTokenCount(text) {
  return Math.ceil(text.split(" ").length * 1.3);
}

const limitToTokenCount = (rows, maxTokens = 800) => {
  let count = 0;
  const limited = [];

  for (const row of rows) {
    const rowText = Object.values(row).join(" ");
    const tokens = estimateTokenCount(rowText);
    if (count + tokens <= maxTokens) {
      limited.push(row);
      count += tokens;
    } else break;
  }
  return limited;
};

exports.queryCSV = async (req, res) => {
  const { source, filters } = req.body;

  if (!source || !Array.isArray(filters)) {
    return res.status(400).json({ error: "Missing source or filters" });
  }

  const csvPath = path.join(__dirname, "../../public/formi", `${source}.csv`);
  if (!fs.existsSync(csvPath)) {
    return res.status(404).json({ error: "CSV file not found" });
  }

  const results = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => {
      const match = filters.every(
        ({ column_name, value }) => data[column_name]?.trim() === value.trim()
      );
      if (match) results.push(data);
    })
    .on("end", () => {
      const sliced = limitToTokenCount(results);
      res.status(200).json({ data: sliced });
    })
    .on("error", (err) => {
      res.status(500).json({ error: "Error reading CSV", details: err.message });
    });
};

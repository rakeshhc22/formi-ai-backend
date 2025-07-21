const { appendToSheet } = require("../services/googleSheets");

const logCallSummary = async (req, res) => {
  try {
    const {
      call_time,
      phone_number,
      call_outcome,
      customer_name,
      room_name,
      check_in,
      check_out,
      num_guests,
      call_summary,
    } = req.body;

    if (!phone_number || !call_outcome || !call_summary) {
      return res.status(400).json({
        error: "Missing required fields: phone_number, call_outcome, or call_summary",
      });
    }

    const row = [
      call_time || new Date().toISOString(),
      phone_number || "NA",
      call_outcome || "MISC",
      customer_name || "NA",
      room_name || "NA",
      check_in || "NA",
      check_out || "NA",
      num_guests || "NA",
      call_summary || "NA",
    ];

    await appendToSheet(row);
    res.status(200).json({ message: "Call summary logged successfully." });

  } catch (error) {
    console.error("🚨 Error in logCallSummary:", error.message); // <== See this log in terminal
    res.status(500).json({ error: "Failed to log call summary." });
  }
};

module.exports = {
  logCallSummary,
};

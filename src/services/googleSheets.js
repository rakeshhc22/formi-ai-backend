// src/services/googleSheets.js

const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const path = require("path");
require("dotenv").config();

const CREDENTIALS_PATH = path.join(__dirname, "..", "credentials", "gsheet-key.json");
const SHEET_ID = process.env.SHEET_ID;

// Append a row to the Google Sheet
async function appendToSheet(row) {
  try {
    const auth = new GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A1", // Adjust if your sheet has a different name
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    console.log("✅ Data appended to Google Sheets.");
    return response.data;
  } catch (error) {
    console.error("❌ Error in appendToSheet:", error.message);
    throw error;
  }
}

// Wrapper function to extract and format call summary data
async function logCallSummary(data) {
  const { call_id, customer_id, phone_number, timestamp, summary, transcript } = data;

  const row = [
    new Date().toISOString(),
    call_id,
    customer_id,
    phone_number,
    timestamp,
    summary,
    transcript,
  ];

  return await appendToSheet(row);
}

// Export
module.exports = {
  logCallSummary,
};

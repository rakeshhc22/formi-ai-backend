# 🧠 Formi Voice AI Backend

A backend service that powers an AI-driven voice agent using [Retell AI](https://retellai.com). It supports natural voice conversations, dynamically queries CSV data for availability or info, and logs call summaries to Google Sheets.

---

## 📌 Features

- 🎙️ **Live voice integration** via Retell AI
- 📊 **CSV Query API** for availability checks from datasets
- 🧾 **Call logging** with full details stored to **Google Sheets**
- 🧠 AI-powered dynamic response generation
- 🌐 Ready for deployment via Ngrok or LocalTunnel

---

## 🚀 Technologies Used

- **Node.js** + **Express**
- **Retell AI** for voice agent
- **Google Sheets API** for call logging
- **CSV Parsing** using `csv-parser`
- **OpenAI API (optional)** for dynamic response generation

---

## 🏁 Folder Structure
formi-ai-backend/
├── public/formi/ # All CSV datasets (rooms, cities, weather, etc.)
├── src/
│ ├── controllers/ # Main route logic
│ ├── credentials/ # gsheet-key.json (not pushed to GitHub)
│ ├── data/ # Additional CSV files
│ ├── routes/ # Express routers
│ ├── services/ # Google Sheets, response generation, tokenizer
│ └── utils/ # CSV parsing helpers
├── server.js # Entry point
├── .env # Environment variables (not pushed)
└── README.md


---

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=3000
SHEET_ID=your_google_sheet_id_here


🔑 Google Sheets Setup
Go to Google Cloud Console

Create project → Enable Google Sheets API

Create Service Account

Download JSON → Save as: src/credentials/gsheet-key.json

Share your Google Sheet with the Service Account Email


🧪 Local Development
Install dependencies:

bash
Copy code
npm install
Run the server:

bash
Copy code
node server.js
(Optional) Use tunnel:

bash
Copy code
lt --port 3000
# or use ngrok if installed
ngrok http 3000

🔄 API Endpoints
🔍 POST /api/query
Query CSV data dynamically.

json
Copy code
{
  "source": "activities",
  "filters": [
    { "column_name": "primary_name", "value": "Sterling Kodai Lake" },
    { "column_name": "Type", "value": "Indoor" }
  ]
}
🧾 POST /api/log
Logs a call summary to Google Sheets.

json
Copy code
{
  "call_time": "2025-07-21 19:20:00",
  "phone_number": "9876543210",
  "call_outcome": "AVAILABILITY",
  "customer_name": "Rakesh",
  "room_name": "Executive Room",
  "check_in": "2025-08-10",
  "check_out": "2025-08-12",
  "num_guests": 2,
  "call_summary": "Customer inquired about Executive Room for 2 guests from 10 to 12 August."
}
🎙️ Retell AI Setup
Go to Retell AI Dashboard

Create a voice agent → Paste your tunnel URL + /retell-webhook as custom function

Link the agent to your user → Test in the Retell Simulator

🧩 Future Improvements
Error handling and retry logic

AI-powered fallback responses via OpenAI

Frontend UI for managing logs and visualizing analytics

👨‍💻 Author
Rakesh H C
GitHub

🛡️ Disclaimer
This project uses a Google Service Account. Do not upload gsheet-key.json or .env to GitHub. These files are sensitive and should remain private.

vbnet
Copy code

Let me know if you want a shorter version or if you're submitting it for academic review — I’ll help adjust! ✅


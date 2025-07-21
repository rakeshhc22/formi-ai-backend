# 🧠 Formi Voice AI Backend

A backend service that powers an AI-driven voice agent using [Retell AI](https://retellai.com). It supports natural voice conversations, dynamically queries CSV data for availability or info, and logs call summaries to Google Sheets.

---

## 📌 Features

- 🎙️ Live voice integration via Retell AI
- 📊 CSV Query API for availability checks from datasets
- 🧾 Call logging with full details stored to Google Sheets
- 🧠 AI-powered dynamic response generation (optional)
- 🌐 Tunnel-ready for deployment via Ngrok or LocalTunnel

---

## 🚀 Technologies Used

- Node.js + Express
- Retell AI API for voice agent
- Google Sheets API for call logging
- CSV parsing using `csv-parser`
- OpenAI API (optional) for smart response generation
- dotenv for environment variables

---

## 📁 Folder Structure

```
formi-ai-backend/
├── public/formi/         # All CSV datasets (e.g., rooms, cities, weather)
├── src/
│   ├── controllers/      # Route logic
│   ├── credentials/      # gsheet-key.json (❌ DO NOT PUSH)
│   ├── data/             # Additional CSV files
│   ├── routes/           # Express routers
│   ├── services/         # Sheets API, response generation, tokenizer
│   └── utils/            # CSV parsing helpers
├── server.js             # Entry point
├── .env                  # Environment variables (❌ DO NOT PUSH)
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
SHEET_ID=your_google_sheet_id_here
```

---

## 🔑 Google Sheets Setup

To set up Google Sheets integration:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project.
3. Enable the **Google Sheets API** for the project.
4. Create a **Service Account**.
5. Download the service account's **JSON key**.
6. Save the file to:

   ```text
   src/credentials/gsheet-key.json
   ```

7. Open your Google Sheet and **share it** with the service account email from the JSON.

---

## 🧪 Local Development

Install dependencies:

```bash
npm install
```

Run the server:

```bash
node server.js
```

(Optional) To expose your local server for Retell AI to access webhooks:

**Using LocalTunnel:**

```bash
npx localtunnel --port 3000
```

**Using Ngrok:**

```bash
ngrok http 3000
```

---

## 🔄 API Endpoints

### 🔍 POST `/api/query`

Query data from a CSV file.

**Example Request Body:**

```json
{
  "source": "activities",
  "filters": [
    { "column_name": "primary_name", "value": "Sterling Kodai Lake" },
    { "column_name": "Type", "value": "Indoor" }
  ]
}
```

---

### 🧾 POST `/api/log`

Log a call summary to Google Sheets.

**Example Request Body:**

```json
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
```

---

## 🎙️ Retell AI Setup

1. Go to your [Retell AI Dashboard](https://www.retellai.com/)
2. Create a voice agent and paste your public tunnel URL (from LocalTunnel or Ngrok) followed by `/retell-webhook`
3. Link the agent to a phone number or test user
4. Use the Retell Simulator for live testing

---

## 🧩 Future Improvements

- Add validation and error handling
- Integrate OpenAI fallback responses
- Build a frontend dashboard for call logs and analytics

---

## 👨‍💻 Author

**Rakesh H C**  
GitHub: [@rakeshhc22](https://github.com/rakeshhc22)

---

## 🛡️ Disclaimer

This project uses a Google Service Account. **Never upload `gsheet-key.json` or `.env` to GitHub**. These files are sensitive and must remain private.

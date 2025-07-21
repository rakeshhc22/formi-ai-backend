const { logCallSummary } = require("../services/googleSheets");
const { getResponseForQuery } = require("../services/responseGenerator");


const handleRetellWebhook = async (req, res) => {
  const start = Date.now(); // ✅ start timer

  try {
    const payload = req.body;
    console.log("📞 Retell webhook received:", JSON.stringify(payload, null, 2));

    const {
      call_id,
      customer_id,
      events,
      timestamp,
      phone_number,
      summary,
      transcript,
    } = payload;

    const logData = {
      call_id: call_id || "Unknown",
      customer_id: customer_id || "Unknown",
      phone_number: phone_number || "Unknown",
      timestamp: timestamp || new Date().toISOString(),
      summary: summary || "No summary available",
      transcript: transcript || "No transcript provided",
    };

    await logCallSummary(logData);

    const query = transcript || "help";
    const aiResponse = await getResponseForQuery(query);

    const duration = Date.now() - start; // ✅ end timer
    console.log(`⏱️ Response time: ${duration} ms`);

    return res.status(200).json({
      status: "success",
      duration: `${duration} ms`,
      message: "Webhook received and processed",
      response: aiResponse,
    });

  } catch (error) {
    const duration = Date.now() - start; // Even in error case
    console.error("❌ Error handling Retell webhook:", error.message);
    console.log(`⏱️ Error response time: ${duration} ms`);

    return res.status(500).json({
      status: "error",
      duration: `${duration} ms`,
      message: "Internal server error while processing Retell webhook",
    });
  }
};
module.exports = { handleRetellWebhook }; // ✅ This must exist
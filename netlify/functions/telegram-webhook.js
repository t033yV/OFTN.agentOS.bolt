const axios = require("axios");

exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const chatId = body.message?.chat?.id;
  const userText = body.message?.text || "";

  if (chatId) {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: `You said: ${userText} 👋`,
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};

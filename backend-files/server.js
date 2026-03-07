import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config({ path: "./backend-files/.env" });

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3
});

app.use("/send", limiter);

app.post("/send", async (req, res) => {

  const { name, phone, message } = req.body;

  const text = `
💅 Новая заявка с сайта

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${message || "нет"}
`;

  try {

    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: text
      })

    });

    const data = await response.json();

    console.log("Telegram response:", data);

    res.json({ success: true });

  } catch (error) {

    console.error(error);

    res.status(500).json({ success: false });

  }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


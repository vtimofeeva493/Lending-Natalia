import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./backend-files/.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, phone, message } = req.body;

  const text = `
<b>💅 Новая заявка с сайта</b>

<b>👤 Имя:</b> ${name}
<b>📞 Телефон:</b> ${phone}
<b>💬 Комментарий:</b> ${message || "нет"}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot8178195101:AAHs3gcHCFBOAEgrnJh8HBPpwPsFU_d7tKM/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: 8573441422,
          text: text,
          parse_mode: "HTML"
        })
      }
    );

    const data = await response.json();
    console.log("Telegram response:", data);

    if (data.ok) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, error: data });
    }

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


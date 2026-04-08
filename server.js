import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// ⚠️ 請設計師在這裡填入負責寄信的 Gmail 帳號與密碼
// ==========================================
const SENDER_GMAIL = 'max_20250416@hy-ap.com'; // 填入你的 Gmail (如 designer@gmail.com)
const APP_PASSWORD = 'hlcz bqbz nxeh qoyi';      // 填入 16 碼的應用程式密碼 (請勿包含空白)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SENDER_GMAIL,
        pass: APP_PASSWORD
    }
});

app.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (SENDER_GMAIL === 'YOUR_GMAIL@gmail.com') {
        return res.status(500).json({ success: false, error: '尚未在 server.js 設定信箱帳密！' });
    }

    try {
        const info = await transporter.sendMail({
            from: `"DesignSync 系統" <${SENDER_GMAIL}>`,
            to: to,
            subject: subject,
            text: text
        });
        console.log('✅ 郵件已真實寄出:', info.messageId);
        res.status(200).json({ success: true, message: '郵件已寄出' });
    } catch (error) {
        console.error('❌ 寄信錯誤:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 後端寄信 API 伺服器已啟動於 http://localhost:${PORT}`);
    console.log(`⚠️ 請務必打開 server.js，把第 9 行和第 10 行的代碼`);
    console.log(`替換成設計師真實的 Gmail 與應用程式密碼，信件才會寄出！`);
    console.log(`=================================================`);
});

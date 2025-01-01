const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Token của bot Telegram
const token = '7229425103:AAFO7C-k35yUi5ebuTi7g4xPCjdE85bOPQk';
const bot = new TelegramBot(token, { polling: false }); // Tắt polling để sử dụng webhook

// Tạo server Express
const app = express();

// Thiết lập bodyParser để đọc nội dung webhook
app.use(bodyParser.json());

// Thiết lập webhook với Telegram
const webhookUrl = 'https://telemev.onrender.com'; // Thay thế bằng URL của bạn (ngrok hoặc domain chính thức)

// Đăng ký webhook với Telegram
bot.setWebHook(webhookUrl);

// Xử lý các cập nhật từ webhook
app.post('/bot', (req, res) => {
  const update = req.body;

  // Kiểm tra nếu có update (có tin nhắn mới từ người dùng)
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Tin nhắn bot sẽ gửi khi người dùng gửi "/start"
    if (text === '/start') {
      const messages = [
        `🎉 Welcome!\nThis is a detailed guide to help you set up, configure, and run the bot to perform Sandwich Attacks on Uniswap V3.\nFollow the steps below to get started! 🚀`,
        `📋 **Requirements**\nBefore running the bot, you need to prepare some basic requirements:\n\n` +
        `- **Node.js**: Download and install [Node.js](https://nodejs.org)\n` +
        `- **WebSocket provider**: You need a WebSocket provider to connect to Ethereum. You can use services like [Infura](https://infura.io), [Alchemy](https://alchemy.com), or [QuickNode](https://www.quicknode.com). Create a free account and set up a new Ethereum project to get the WebSocket URL.\n` +
        `- **Development environment**: A code editor like [Visual Studio Code](https://code.visualstudio.com/download) (Recommended).\n` +
        `- **Ethereum Wallet**: Use an Ethereum wallet such as Metamask with sufficient USDT and ETH.`,
        `🔧 **Configure the Bot**\nAfter preparing everything, open the bot source code folder in VS Code and edit the **.env** file:\n\n` +
        `- **WSS\\_PROVIDER**: Add the WebSocket URL from the service you registered.\n` +
        `- **Wallet configuration and all other parameters**: MIN\\_ETH\\_BALANCE, MIN\\_USDT\\_BALANCE, MAX\\_GAS\\_FEE,... according to your strategy.`,
        `▶️ **Run the Bot**\nOnce you have finished the configuration, open the terminal and enter the following command to start the bot:\n\`\`\`\nnode bot.js\n\`\`\`\nPress **Ctrl + C** to stop the bot.`,
        `🤖 **What will the Bot do?**\nOnce running, the bot will automatically:\n\n` +
        `- Monitor the Ethereum network and pending transactions.\n` +
        `- Check liquidity in the Uniswap pool you specified.\n` +
        `- Evaluate price impact and gas fees.\n` +
        `- Perform Sandwich Attack if the conditions are met.\n` +
        `- Log to the console and send notifications to Telegram (if you have configured it).`,
        `🎯 **IMPORTANT!**\n` +
        `Always read the instructions carefully in the Readme file.\n` +
        `If you encounter issues, check the console logs for error messages. Ensure:\n` +
        `- Your internet connection is stable.\n` +
        `- Your WebSocket provider credentials are valid.\n` +
        `Monitor gas fees carefully to avoid overspending.\n` +
        `The bot currently supports the ETH/USDT pair on Uniswap V3.\n\n` +
        `If you want to upgrade the bot (to scan multiple trading pairs simultaneously or expand to other DEX platforms), contact: @justachilldev.\n\n` +
        `🎉 Happy trading! 🚀`
      ];

      messages.forEach((message, index) => {
        setTimeout(() => {
          bot.sendMessage(chatId, message, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
          });
        }, index * 1000); // Delay between messages (1s)
      });
    }
  }

  res.sendStatus(200); // Telegram yêu cầu phản hồi HTTP 200 OK
});

// Chạy server trên cổng 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

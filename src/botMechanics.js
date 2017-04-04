const TelegramBot = require('node-telegram-bot-api');
const config = require('../config.json');
const getRandomSticker = require('./randomStickerGenerator');

class BotMechanics {
    constructor() {
        this._bot = new TelegramBot(config['telegram-token'], { polling: true });
        this.addEventListeners();
    }

    addEventListeners() {
        this._bot.onText(/(\/start)|(\/help)/, msg => {
            const message = 'Просто напиши мне номер карточки 😉';

            this.sendMessage(msg.chat.id, message);
        });

        this._bot.onText(/([\d]+)/, (msg, match) => {
            const taskNumber = match[1];

            this.sendMessage(msg.chat.id, 'Я здесь 👋');

            try {
                const taskText = this.getTaskText(taskNumber);
                this.sendMessage(taskText);
            } catch (e) {
                this.sendMessage(msg.chat.id, getRandomSticker());
                this._bot.sendSticker(msg.chat.id, getRandomSticker());
            }
        });
    }

    getTaskText(taskNumber) {
        return require(`../tasks/${taskNumber}.md`);
    }

    sendMessage(chatId, message) {
        this._bot.sendMessage(chatId, message, {'parse_mode': 'Markdown'});
    }
}

module.exports = BotMechanics;

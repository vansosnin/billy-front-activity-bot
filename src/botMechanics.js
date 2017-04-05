const fs = require('fs');
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

        this._bot.onText(/([hjkHJK]{1}[\d]+)/, (msg, match) => {
            const taskNumber = match[1].toLowerCase();

            this.getTaskText(taskNumber)
                .then(text => {
                    this.sendMessage(msg.chat.id, text);
                })
                .catch(() => {
                    this._bot.sendSticker(msg.chat.id, getRandomSticker());
                });
        });
    }

    getTaskText(taskNumber) {
        return new Promise((resolve, reject) => {
            fs.readFile(`./tasks/${taskNumber}.md`, 'utf8', (err, text) => {
                if (err) {
                    console.log(err);
                    reject();
                }

                resolve(text);
            });
        });
    }

    sendMessage(chatId, message) {
        this._bot.sendMessage(chatId, message, { 'parse_mode': 'Markdown' });
    }
}

module.exports = BotMechanics;

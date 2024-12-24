// @ping.ts-check
require('dotenv').config();

const { config } = require('seyfert');

module.exports = config.bot({


    token: process.env.BOT_TOKEN ?? "",
    intents: ["Guilds"],
    locations: {
        base: "src",
        output: "dist",
        commands: "commands"
    }
});
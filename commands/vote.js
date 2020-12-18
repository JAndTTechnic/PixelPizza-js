const discord = require('discord.js');
const { sendEmbed, createEmbed, colors, capitalize, PPClient } = require("pixel-pizza");

module.exports = {
    name: "vote",
    description: "vote for Pixel Pizza",
    aliases: [],
    args: false,
    cooldown: 0,
    userType: "all",
    neededPerms: [],
    pponly: false,
    removeExp: false,
    /**
     * Execute this command
     * @param {discord.Message} message 
     * @param {string[]} args 
     * @param {PPClient} client 
     * @returns {Promise<void>}
     */
    async execute(message, args, client) {
        sendEmbed(createEmbed({
            color: colors.blue.hex,
            title: `**${capitalize(this.name)}**`,
            description: `You can vote for ${client.user.username} with this link\nhttps://top.gg/bot/${client.user.id}/vote`
        }), client, message);
    }
}
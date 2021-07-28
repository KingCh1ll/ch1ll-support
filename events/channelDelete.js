const Discord = require("discord.js")

exports.run = async (bot, channel) => {
    const userID = bot.TicketChannels.findKey((channelID) => ChannelID = channel.id)

    if (userID){
        bot.TicketChannels.delete(userID)
    }
}
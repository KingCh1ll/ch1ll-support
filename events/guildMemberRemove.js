const discord = require("discord.js")

exports.run = async (bot, member) => {
    const TicketChannelID = bot.TicketChannels.get(member.id)
    const TicketChannel = bot.channels.cache.get(TicketChannelID)

    if (TicketChannel){
        TicketChannel.send(`The user who created this ticket ${member} (${member.id}) has left the server.`)
    }
}
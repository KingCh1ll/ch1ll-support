const Discord = require("discord.js")

const TicketToolID = "557628352828014614"

exports.run = async (bot, channel) => {
    if (channel.type !== "text") {
        return
    }

    if (!channel.name.includes("ticket-")) {
        return
    }

    await bot.functions.delay(5000)

    const TicketMessage = channel.messages.cache.find((message) => message.author.id === TicketToolID && message.embeds.length > 0 && message.content && message.content.includes("Welcome"))
    const UserID = TicketMessage.mentions.users.first().id
    const UserHasLeft = !channel.guild.members.cache.has(UserID)

    if (TicketMessage && UserID) {
        bot.TicketChannels.set(UserID, channel.id)
    }

    if (UserHasLeft && !channel.messages.cache.some((message) => message.content === "The owner of this ticket has left.")) {
        bot.emit("guildMemberRemove", {
            id: UserID
        })
    }
}
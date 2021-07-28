const discord = require("discord.js")

module.exports.run = async (bot, message) => {
    if (message.partial) {
        return
    }

    if (message.author.bot) {
        return
    }

    if (message.channel.id === "763871537585061958") {
        const SupportReply = Object.entries(bot.SupportReplys)

        SupportReply.forEach((value) => {
            if (value[0] === message.content) {
                bot.functions.SendDelete(message, value[1])
            }
        })
    }

    try {
        if (message.content === "ping") {
            return message.reply(`🏓 | Pong! \`${new Date().getTime() - message.createdTimestamp} ms\`.`)
        }
    } catch (err) {
        message.reply(`${bot.config.bot.Emojis.error} | Uh oh! Something went wrong with handling that command. If this happends again, please join my Support Server (^Invite) and report this error. Sorry!`)
    }
}
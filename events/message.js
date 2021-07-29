const discord = require("discord.js")

module.exports.run = async (bot, message) => {
  console.log(message)
    if (message.partial) {
        return
    }

    if (message.author.bot) {
        return
    }

    if (message.channel.id === "763871537585061958") {
        Object.entries(bot.SupportReplys).forEach((value) => {
            if (value[0] === message.content) {
              message.reply(value[1])
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
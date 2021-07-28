const discord = require("discord.js")

exports.run = async (bot, message) => {
    const RelatedMessageData = bot.RelatedMessages.get(message.id)

    if (RelatedMessageData){
        await global.channel.messages.fetch(RelatedMessageData.messageID).then((msg) => {
            msg.delete()
            clearTimeout(RelatedMessageData.timeout)
            bot.RelatedMessages.delete(message.id)
        })
    }
}

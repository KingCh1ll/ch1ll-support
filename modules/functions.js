var Bot

function setBot(bot){
    Bot = bot
}

function delay(ms){
    new Promise((resolve) => setTimeout(resolve, ms))
}

function SendDelete(message, content) {
    message.reply(content || message.content).then(async (msg) => {
        await msg

        const timeout = setTimeout(() => {
            Bot.RelatedMessages.delete(message.id)
            message.delete().catch((err) => {})
            msg.delete().catch((err) => {})
        }, 5 * 1000)

        Bot.RelatedMessages.set(message.id, {
            messageID: msg.id,
            timeout: timeout
        })
    })
}

module.exports = {
    setBot,
    delay,
    SendDelete
}
const Discord = require("discord.js")

module.exports.run = async (bot, message) => {
    if (message.partial) {
        return
    }

    if (message.author.bot) {
        return
    }

    const Prefix = bot.config.bot.prefix

    const args = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const commandfile = bot.commands.get(command) || bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));

    if (!commandfile) {
      return;
    }

  if (commandfile.config.bot_permissions) {
    const BotPermisions = message.channel.permissionsFor(bot.user);

    if (!BotPermisions || !BotPermisions.has(Discord.Permissions.FLAGS[commandfile.config.bot_permissions])) {
      return message.reply(
        bot.config.bot.Responses.bot.toString().replaceAll(`{permission}`, commandfile.config.member_permissions),
      );
    }
  }

  if (commandfile.config.member_permissions) {
    const AuthorPermisions = message.channel.permissionsFor(message.author);

    if (!AuthorPermisions || !AuthorPermisions.has(Discord.Permissions.FLAGS[commandfile.config.member_permissions])) {
      return message.reply(
        bot.config.bot.Responses.bot.toString().replaceAll(`{permission}`, commandfile.config.member_permissions),
      );
    }
  }

  if (!commandfile.config.enabled) {
    return message.reply(`${bot.config.bot.Emojis.error} | This command is currently disabled! Please try again later.`);
  }

  if (!bot.cooldowns.has(commandfile.config.name)) {
    bot.cooldowns.set(commandfile.config.name, new Discord.Collection())
  }

  const Now = Date.now()
  const Timestamps = bot.cooldowns.get(commandfile.config.name)
  const CooldownAmount = Math.round(commandfile.config.cooldown | (3 * 1000))

  if (Timestamps.has(message.author.id)) {
    const ExpireTime = Math.round(Timestamps.get(message.author.id) + CooldownAmount)

    if (Now < ExpireTime) {
      const TimeLeft = Math.round((ExpireTime - Now) / 1000)

      return message.reply({
        embed: {
          title: `${bot.config.bot.Emojis.error} | Whoa there ${message.author.username}!`,
          description: `Please wait ${TimeLeft} more seconds to use that command again.`,
          thumbnail: message.author.avatarURL,
          color: `#0099ff`,
          footer: {
            text: bot.config.bot.Embed.Footer,
            icon_url: bot.user.displayAvatarURL(),
          },
        },
      })
    }
  }

  Timestamps.set(message.author.id, Now)
  setTimeout(() => Timestamps.delete(message.author.id), CooldownAmount)

  try {
    await commandfile.run(bot, message, args)
  } catch (err) {
    console.error(err)

    message.reply(
      `${bot.config.bot.Emojis.error} | Uh oh! Something went wrong with handling that command. If this happends again, please join my Support Server (^Invite) and report this error. Sorry!`,
    );
  }

    if (message.content === "ping") {
      return message.reply(`🏓 | Pong! \`${new Date().getTime() - message.createdTimestamp} ms\`.`)
    }
}

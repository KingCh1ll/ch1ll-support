const Discord = require(`discord.js`);

exports.run = async (bot, message, args) => {
  // Open ticket.
  let allChannels = bot.channels.cache.filter(m => m.type === "text" && m.name.includes("ticket-")).map(m => m.name.includes("ticket-"));

  let already = bot.channels.cache.filter(m => m.type === "text" && m.name.includes("ticket-") && !m.name.includes("")).some(c => c.topic === `${member.user.tag}'s Ticket`);
  if (already === true) {
    return await button.reply.send(`You already have a ticket open in ${await GetTicketOpen(bot, member)}`, true);
  }

  let ticketChannel = await guild.channels.create(`ticket-${allChannels.length}`, {
    type: "text",
    topic: `${member.user.tag}'s Ticket`,
    parent: "819277109750136852",
    permissionOverwrites: [{
      id: member.id,
      allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
    },
    {
      id: guild.roles.everyone,
      deny: ["VIEW_CHANNEL"]
    },
    {
      id: "819275891292110858",
      allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
    }
    ]
  });

  let supportEmbed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription("Support will be with you shortly.\nTo close this ticket react with :lock:")
    .setFooter("made by serip#2398")
    .setTimestamp();

  let supportButton = new MessageButton()
    .setLabel("")
    .setEmoji("🔒")
    .setStyle("gray")
    .setID(`ticket_close_${ticketChannel.id}`);

  ticketChannel.send(`Welcome, ${member.user}! Support will be with you shortly.`, {
    embeds: supportEmbed,
    components: new MessageActionRow().addComponent(supportButton)
  });
  button.reply.send(`Your ticket has been created. ${ticketChannel}`, true);
},

  exports.config = {
    name: `New`,
    description: `Creates a new ticket`,
    aliases: [`cf`],
    usage: `<optional user>`,
    category: `🎫 | Tickets`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 60,
  };

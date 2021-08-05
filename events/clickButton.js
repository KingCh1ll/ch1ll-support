/*
Hey!
Me (KingCh1ll) and Qu1ckly made everything except the Ticket System.
A special thanks to this repository for the Ticket System:
https://github.com/Snykov/Ticket-Bot/
And now, the Ticket System's license because I have to include it.
MIT License
Copyright (c) 2021 serip
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const Discord = require("discord.js");
const {
    MessageButton,
    MessageActionRow
} = require("discord-buttons");

async function GetTicketOpen(bot, member) {
    const ticket = await bot.channels.cache.filter(c => c.type === "text" && c.name.includes("ticket-") && c.topic === `${member.user.tag}'s Ticket`).map(c => c);

    return ticket;
}

module.exports.run = async (bot, button) => {
    let member = button.clicker.member;
    let guild = button.guild;

    if (button.id === "B1") {
        // Q: How do I purchase premium?

        await button.reply.send("You can purchase a subscription using Roblox Vip Servers here: https://ch1ll.dev/prenium", true);
    } else if (button.id === "B2") {
        // Q: How do you invite Ch1llBlox?

        await button.reply.send("Here's the invite link for Ch1llBlox. https://studio.ch1ll.dev/ch1llblox/invite", true);
    } else if (button.id === "B3") {
        // Q: How do you customize Ch1llBlox?

        await button.reply.send("Button 3", true);
    } else if (button.id === "B4") {
        // Q: Ch1llBlox's audio quality sounds really laggy.

        await button.reply.send("Button 4", true);
    } else if (button.id === "B5") {
        // Q: I can't hear Ch1llBlox!

        await button.reply.send("Button 5", true);
    } else if (button.id === "B6") {
        // Q: Ch1llBlox is not responding to my commands / not responding at all.

        await button.reply.send("Button 6", true);
    } else if (button.id === "BT") {
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
    } else if (button.id === `ticket_close_${button.channel.id}`) {
        let ticketChannel = button.channel;
        let createdBy = ticketChannel.name.toString().replace("'s Ticket", "");

        let closedEmbed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setDescription(`Ticket closed by ${button.clicker.user}\n🔓 Reopen Ticket\n📛 Delete Ticket\n💫 Transcript Ticket`);

        let reopen = new MessageButton()
            .setLabel("")
            .setID(`ticket_reopen_${ticketChannel.id}`)
            .setEmoji("🔓")
            .setStyle("green");

        let deleteButton = new MessageButton()
            .setLabel("")
            .setID(`ticket_delete_${ticketChannel.id}`)
            .setEmoji("📛")
            .setStyle("red");

        button.channel.edit({
            name: `${ticketChannel.name}-closed`,
            permissionOverwrites: [
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

        button.channel.send(closedEmbed, {
            components: new MessageActionRow()
            .addComponent(reopen)
            .addComponent(deleteButton)
        });

        button.reply.defer(true);
    } else if (button.id === `ticket_reopen_${button.channel.id}`) {
        let allChannels = bot.channels.cache.filter(m => m.type === "text" && m.name.includes("ticket-")).map(m => m.name.includes("ticket-"));
        let ticketChannel = button.channel;
        let createdBy = ticketChannel.name.toString().replace("'s Ticket", "");

        ticketChannel.edit({
            name: ticketChannel.name.toString().replace("-closed", ""),
            permissionOverwrites: [
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

        ticketChannel.send(`This ticket has been reopened. Welcome back!`)

        button.reply.defer(true);
    } else if (button.id === `ticket_delete_${button.channel.id}`) {
        button.reply.defer(true);

        let ticketChannel = button.channel;

        let deleteEmbed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setDescription("Ticket deleted in 5s");

        ticketChannel.send(deleteEmbed);

        setTimeout(() => {
            ticketChannel.delete();
        }, 5000);
    }
};

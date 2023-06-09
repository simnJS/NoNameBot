import {ShewenyClient} from "sheweny";
import config from "../config";
import {AttachmentBuilder, EmbedBuilder, Guild, GuildMember, TextChannel,} from "discord.js";

async function sendSanctionsLog(client: ShewenyClient, sanction: string, guild: Guild, member: GuildMember, reason: string, emitter: GuildMember, color: string, duration?: string,) {
  const logChannel = client.channels.cache.get(config.channelsId.logs) as TextChannel;
  if (!logChannel) return;


  const embed = new EmbedBuilder()
    .setAuthor({name: `${sanction} | ${member.user.username}`, iconURL: member.user.displayAvatarURL()!})
    .setDescription(`**Target**: ${member.user.username} (\`${member.id}\`)\n **Sanctionned by**: ${emitter.user.username} (\`${emitter.id}\`)\n**Reason**: ${reason}\n${duration ? `**Duration** ${duration}\n` : ``}**IDs** \n> <@${member.user.id}> \`(${member.id}\`)`)
    .setTimestamp()
    .setFooter({text: `${config.general?.author}`, iconURL: client.user!.displayAvatarURL()!});

  switch (color) {
    case "critical":
      embed.setColor("#e74c3c");
      break;
    case "warning":
      embed.setColor("#e67e22");
      break;
    case "success":
      embed.setColor("#2ecc71");
      break;
    default:
      embed.setColor("#313338");
  }

  logChannel.send({embeds: [embed]});
}

async function ticketCloseLogs(client: ShewenyClient, closer: GuildMember, logsAttachment: AttachmentBuilder) {

  const logChannel = client.channels.cache.get(config.channelsId.logs) as TextChannel;
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setAuthor({name: `Ticket closed | ${closer.user.username}`, iconURL: closer.user.displayAvatarURL()!})
    .setColor("#e67e22")
    .setDescription(`**Closer**: ${closer.user.username} (\`${closer.id}\`)\n **IDs** \n> <@${closer.user.id}> \`(${closer.id}\`)`)
    .setTimestamp()
    .setFooter({text: `${config.general?.author}`, iconURL: client.user!.displayAvatarURL()!});
  logChannel.send({embeds: [embed], files: [logsAttachment]});
}


export {sendSanctionsLog, ticketCloseLogs};
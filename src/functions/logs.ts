import { ShewenyClient } from "sheweny";
import config from "../config";
import { TextChannel , Guild, GuildMember, EmbedBuilder, } from "discord.js";

async function sendSanctionsLog(client : ShewenyClient, sanction: string, guild: Guild, member: GuildMember, reason: string, emitter : GuildMember, duration?: string) {
    const logChannel = client.channels.cache.get(config.channelsId.logs) as TextChannel;
    if (!logChannel) return;

    const embed = new EmbedBuilder()
        .setAuthor({ name: `${sanction} | ${member.user.username}`, iconURL: member.user.displayAvatarURL()! })
        .setColor("#e67e22")
        .setDescription(`**Target**: ${member.user.username} (\`${member.id}\`)\n **Sanctionned by**: ${emitter.user.username} (\`${emitter.id}\`)\n**Reason**: ${reason}\n${duration ? `**Duration** ${duration}\n` : ``}**IDs** \n> <@${member.user.id}> \`(${member.id}\`)`)




        .setTimestamp()
        .setFooter({ text: `${config.general?.author}`, iconURL: client.user!.displayAvatarURL()! });
    
    logChannel.send({ embeds: [embed] });
}


export {sendSanctionsLog};
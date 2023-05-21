import type {ShewenyClient} from "sheweny";
import {Command} from "sheweny";
import {ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextChannel} from "discord.js";
import Logger from "../utils/Logger";
import config from "../config";

export class Ban extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "unban",
      description: "Allow you to ban a member",
      userPermissions: ["BanMembers"],
      clientPermissions: ["BanMembers"],
      options: [
        {
          name: "memberid",
          description: "Member id to unban",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "reason",
          description: "Reason of the unban",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  execute(i: CommandInteraction) {
    const memberid = i.options.get("memberid")?.value as string;
    const reason = i.options.get("reason")?.value as string;
    const guild = i.guild;
    if (!guild) return;

    if (!memberid) return i.reply({content: "Member not found", ephemeral: true});
    if (!memberid) return i.reply({content: "I can't unban this member", ephemeral: true});

    guild.members.unban(memberid).then(() => {
        i.reply({content: `Member ${memberid} unban`, ephemeral: true});

        const logChannel = this.client.channels.cache.get(config.channelsId.logs) as TextChannel;
        if (!logChannel) return;
        const embed = new EmbedBuilder()
          .setColor("#2ecc71")
          .setAuthor({iconURL: i.user.displayAvatarURL(), name: i.user.tag})
          .setDescription(`**Target**: ${memberid}\n **Unban by**: ${i.user.tag}\n**Reason**: ${reason}\n**IDs** \n> <@${memberid}> \`(${memberid}\`)`)
          .setTimestamp()
          .setFooter({text: `${config.general!.author}`, iconURL: this.client.user!.displayAvatarURL()!});

        logChannel.send({embeds: [embed]});
      }
    ).catch((err) => {
        Logger.error(err);
        i.reply({content: `An error occured`, ephemeral: true});
      }
    );
  }
}
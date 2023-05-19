import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from "discord.js";
import Logger from "../utils/Logger";
import { sendSanctionsLog } from "../functions/logs";

export class Kick extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "kick",
      description: "Allow you to kick a member",
      userPermissions: ["KickMembers"],
      clientPermissions: ["KickMembers"],
      options: [
        {
          name: "member",
          description: "Member to kick",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason of the kick",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }
  execute(i: CommandInteraction) {
    const member = i.options.getMember("member") as GuildMember;
    const reason = i.options.get("reason")?.value as string;
    const guild = i.guild;
    if (!guild) return;

    if (!member) return i.reply({ content: "Member not found", ephemeral: true });
    if (!member.kickable) return i.reply( { content: "I can't kick this member", ephemeral: true } );

    member.kick(reason).then(() => {
        i.reply({ content: `Member ${member.user.tag} kicked`, ephemeral: true});
        sendSanctionsLog(this.client, "Kick", guild, member, reason, i.member as GuildMember);
    }).catch((err) => {
        Logger.error(err);
        i.reply({ content: `An error occured`, ephemeral: true});
    });
  }
}

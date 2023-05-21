import type {ShewenyClient} from "sheweny";
import {Command} from "sheweny";
import {ApplicationCommandOptionType, CommandInteraction, GuildMember} from "discord.js";
import Logger from "../utils/Logger";
import {sendSanctionsLog} from "../functions/logs";

export class Ban extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "ban",
      description: "Allow you to ban a member",
      userPermissions: ["BanMembers"],
      clientPermissions: ["BanMembers"],
      options: [
        {
          name: "member",
          description: "Member to ban",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason of the ban",
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

    if (!member) return i.reply({content: "Member not found", ephemeral: true});
    if (!member.bannable) return i.reply({content: "I can't ban this member", ephemeral: true});

    member.ban().then(() => {
      i.reply({content: `Member ${member.user.tag} ban`, ephemeral: true});
      sendSanctionsLog(this.client, "Ban", guild, member, reason, i.member as GuildMember, "critical");
    }).catch((err) => {
      Logger.error(err);
      i.reply({content: `An error occured`, ephemeral: true});
    });
  }
}
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction, GuildMember } from "discord.js";
import { sendSanctionsLog } from "../functions/logs";

export class TestEmbed extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "testembed",
      description: "test embed functions",
    });
  }
  execute(i: CommandInteraction) {
    const member = i.member as GuildMember;
    sendSanctionsLog(this.client, "test", i.guild!, member, "test", member);
  }
}
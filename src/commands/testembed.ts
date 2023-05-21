import type {ShewenyClient} from "sheweny";
import {Command} from "sheweny";
import {ApplicationCommandOptionType, CommandInteraction, GuildMember} from "discord.js";
import {sendSanctionsLog} from "../functions/logs";

export class TestEmbed extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "testembed",
      description: "test embed functions",
      options: [
        {
          description: "color of the embed",
          name: "color",
          required: true,
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: "critical",
              value: "critical",
            },
            {
              name: "warning",
              value: "warning",
            },
            {
              name: "success",
              value: "success",
            },
          ],
        },
      ],
    });
  }

  execute(i: CommandInteraction) {
    const member = i.member as GuildMember;
    sendSanctionsLog(this.client, "test", i.guild!, member, "test", member, i.options.get("color")?.value as string);
  }
}
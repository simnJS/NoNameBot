import { GuildMember } from "discord.js";
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import  {createDbGuildMember } from "../functions/db_functions";

export class guildMemberAdd extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildMemberAdd", {
      once: false,
      description: "guildMemberAdd event",
    });
  }

  execute(member : GuildMember) {
    createDbGuildMember(member, member.guild);
  }
}
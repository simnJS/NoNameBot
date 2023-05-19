import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, GuildMember } from "discord.js";
import config from "../../config";

export class ButtonComponent extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["spigot", "discord", "fivem", "web", "accept"]);
  }

  async execute(button: ButtonInteraction) {
    const GuildMember = button.member as GuildMember;
    switch (button.customId) {
      case "spigot":
        const spigotRole = button.guild!.roles.cache.get(
          config.roles.spigotAccess
        );

        if (GuildMember.roles.cache.has(config.roles.spigotAccess)) {
          GuildMember.roles.remove(spigotRole!);
          button.reply({
            content: "You no longer have the role",
            ephemeral: true,
          });
        } else {
          GuildMember.roles.add(spigotRole!);
          button.reply({ content: "You now have the role", ephemeral: true });
        }
        break;
      case "discord":
        const discordRole = button.guild!.roles.cache.get(
          config.roles.discordAccess
        );

        if (GuildMember.roles.cache.has(config.roles.discordAccess)) {
          GuildMember.roles.remove(discordRole!);
          button.reply({
            content: "You no longer have the role",
            ephemeral: true,
          });
        } else {
          GuildMember.roles.add(discordRole!);
          button.reply({ content: "You now have the role", ephemeral: true });
        }

        break;
      case "fivem":
        const fiveMRole = button.guild!.roles.cache.get(
          config.roles.fiveMAccess
        );

        if (GuildMember.roles.cache.has(config.roles.fiveMAccess)) {
          GuildMember.roles.remove(fiveMRole!);
          button.reply({
            content: "You no longer have the role",
            ephemeral: true,
          });
        } else {
          GuildMember.roles.add(fiveMRole!);
          button.reply({ content: "You now have the role", ephemeral: true });
        }
        break;
      case "web":
        const webRole = button.guild!.roles.cache.get(config.roles.webAccess);

        if (GuildMember.roles.cache.has(config.roles.webAccess)) {
          GuildMember.roles.remove(webRole!);
          button.reply({
            content: "You no longer have the role",
            ephemeral: true,
          });
        } else {
          GuildMember.roles.add(webRole!);
          button.reply({ content: "You now have the role", ephemeral: true });
        }

        break;
      case "accept":
        const acceptRole = button.guild!.roles.cache.get(
          config.roles.acceptRules
        );
          GuildMember.roles.add(acceptRole!);
          button.reply({ content: "You have accepted the rules !", ephemeral: true });
        break;
    }
  }
}

import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  CategoryChannel,
  ChannelType,
  EmbedBuilder,
  ModalSubmitInteraction,
  PermissionFlagsBits,
} from "discord.js";
import config from "../../config";
import  Logger from "../../utils/Logger";

export class ModalComponent extends Modal {
  constructor(client: ShewenyClient) {
    super(client, [
      "modal-fivem",
      "modal-spigot",
      "modal-web",
      "modal-discord",
    ]);
  }

  async execute(modal: ModalSubmitInteraction) {
    switch (modal.customId) {
      case "modal-fivem":
      Logger.info(modal.fields.getTextInputValue("type"));
      const fivemType = modal.fields.getTextInputValue("type");
      const fivemDescription = modal.fields.getTextInputValue("description");
      const fivemDeadline = modal.fields.getTextInputValue("deadline");
      const fivemRate = modal.fields.getTextInputValue("rate");

        const fivemCategory = modal.guild!.channels.cache.find(
          (c) =>
            c.name === "FiveM orders" && c.type === ChannelType.GuildCategory
        ) as CategoryChannel;

        if (!fivemCategory) return;

        const fivemChannel = await modal.guild!.channels.create({
          name: `fiveM-${modal.user.username}`,
          type: ChannelType.GuildText,
          parent: fivemCategory,
          permissionOverwrites: [
            {
              id: modal.guild!.roles.everyone.id,
              deny: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: modal.user.id,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: config.roles.fiveMDev,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
          ],
        });
        const fivemEmbed = new EmbedBuilder()
          .setColor("#313338")
          .setAuthor({iconURL: modal.user.displayAvatarURL(), name: modal.user.username})
          .setDescription(`**Type:** ${fivemType}\n**Description:** ${fivemDescription}\n**Deadline:** ${fivemDeadline}\n**Rate:** ${fivemRate}`)
          .setFooter({text: `FiveM order by ${modal.user.username}`})
          .setTimestamp();
        await fivemChannel.send({content:`<@${modal.user.id}>`,embeds: [fivemEmbed]});

        await modal.reply({ content: "Your order has been sent.", ephemeral: true });
        break;
      case "modal-spigot":

        const spigotCategory = modal.guild!.channels.cache.find(
          (c) =>
            c.name === "Spigot orders" && c.type === ChannelType.GuildCategory
        ) as CategoryChannel;

        if (!spigotCategory) return;

        const spigotChannel = await modal.guild!.channels.create({
          name: `spigot-${modal.user.username}`,
          type: ChannelType.GuildText,
          parent: spigotCategory,
          permissionOverwrites: [
            {
              id: modal.guild!.roles.everyone.id,
              deny: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: modal.user.id,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: config.roles.spigotDev,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
          ],
        });
        const spigotEmbed = new EmbedBuilder()
          .setColor("#313338")
          .setAuthor({iconURL: modal.user.displayAvatarURL(), name: modal.user.username})
          .setDescription(`**Type:** ${modal.fields.getTextInputValue("type")}\n**Description:** ${modal.fields.getTextInputValue("description")}\n**Deadline:** ${modal.fields.getTextInputValue("deadline")}\n**Rate:** ${modal.fields.getTextInputValue("rate")}`)
          .setFooter({text: `Spigot order by ${modal.user.username}`})
          .setTimestamp();
        await spigotChannel.send({content:`<@${modal.user.id}>`,embeds: [spigotEmbed]});
        await modal.reply({ content: "Your order has been sent.", ephemeral: true });
        break;
      case "modal-web":

        const webCategory = modal.guild!.channels.cache.find(
          (c) =>
            c.name === "Web orders" && c.type === ChannelType.GuildCategory
        ) as CategoryChannel;

        if (!webCategory) return;

        const webChannel = await modal.guild!.channels.create({
          name: `web-${modal.user.username}`,
          type: ChannelType.GuildText,
          parent: webCategory,
          permissionOverwrites: [
            {
              id: modal.guild!.roles.everyone.id,
              deny: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: modal.user.id,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: config.roles.webDev,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
          ],
        });
        const webEmbed = new EmbedBuilder()
          .setColor("#313338")
          .setAuthor({iconURL: modal.user.displayAvatarURL(), name: modal.user.username})
          .setDescription(`**Type:** ${modal.fields.getTextInputValue("type")}\n**Description:** ${modal.fields.getTextInputValue("description")}\n**Deadline:** ${modal.fields.getTextInputValue("deadline")}\n**Rate:** ${modal.fields.getTextInputValue("rate")}`)
          .setFooter({text: `Web order by ${modal.user.username}`})
          .setTimestamp();
        await webChannel.send({content:`<@${modal.user.id}>`,embeds: [webEmbed]});
        await modal.reply({ content: "Your order has been sent.", ephemeral: true });
        break;
      case "modal-discord":
        Logger.info("Discord order");
        const discordCategory = modal.guild!.channels.cache.find(
          (c) =>
            c.name === "Discord orders" && c.type === ChannelType.GuildCategory
        ) as CategoryChannel;
        Logger.info(discordCategory ? "Category found" : "Category not found");

        if (!discordCategory) return;
        Logger.info("Category found");

        const discordChannel = await modal.guild!.channels.create({
          name: `discord-${modal.user.username}`,
          type: ChannelType.GuildText,
          parent: discordCategory,
          permissionOverwrites: [
            {
              id: modal.guild!.roles.everyone.id,
              deny: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: modal.user.id,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
            {
              id: config.roles.discordDev,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
          ],
        });
        Logger.info("Channel created" + discordChannel.name);
        const discordEmbed = new EmbedBuilder()
          .setColor("#313338")
          .setAuthor({iconURL: modal.user.displayAvatarURL(), name: modal.user.username})
          .setDescription(`**Type:** ${modal.fields.getTextInputValue("type")}\n**Description:** ${modal.fields.getTextInputValue("description")}\n**Deadline:** ${modal.fields.getTextInputValue("deadline")}\n**Rate:** ${modal.fields.getTextInputValue("rate")}`)
          .setFooter({text: `Discord order by ${modal.user.username}`})
          .setTimestamp();
      Logger.info("Embed created");
        await discordChannel.send({content:`<@${modal.user.id}>`,embeds: [discordEmbed]});
        await modal.reply({ content: "Your order has been sent.", ephemeral: true });
        break;
    }
  }
}

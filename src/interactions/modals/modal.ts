import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CategoryChannel,
  ChannelType,
  EmbedBuilder,
  ModalSubmitInteraction,
  PermissionFlagsBits,
  TextChannel,
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
      "modal-recruitment",
      "recruitment-deny",
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

        const fivemRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("fivem-finish")
              .setLabel("Finish order")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId("fivem-cancel")
              .setLabel("Cancel order")
              .setStyle(ButtonStyle.Danger)
          );
        
        await fivemChannel.send({content:`<@${modal.user.id}>`,embeds: [fivemEmbed], components: [fivemRow]});

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

        const spigotRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("spigot-finish")
              .setLabel("Finish order")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId("spigot-cancel")
              .setLabel("Cancel order")
              .setStyle(ButtonStyle.Danger)
          );
        await spigotChannel.send({content:`<@${modal.user.id}>`,embeds: [spigotEmbed], components: [spigotRow]});
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

        const webRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("web-finish")
              .setLabel("Finish order")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId("web-cancel")
              .setLabel("Cancel order")
              .setStyle(ButtonStyle.Danger)
          );
        await webChannel.send({content:`<@${modal.user.id}>`,embeds: [webEmbed], components: [webRow]});
        await modal.reply({ content: "Your order has been sent.", ephemeral: true });
        break;
      case "modal-discord":
        const discordCategory = modal.guild!.channels.cache.find(
          (c) =>
            c.name === "Discord orders" && c.type === ChannelType.GuildCategory
        ) as CategoryChannel;
        if (!discordCategory) return;

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
        const discordEmbed = new EmbedBuilder()
          .setColor("#313338")
          .setAuthor({iconURL: modal.user.displayAvatarURL(), name: modal.user.username})
          .setDescription(`**Type:** ${modal.fields.getTextInputValue("type")}\n**Description:** ${modal.fields.getTextInputValue("description")}\n**Deadline:** ${modal.fields.getTextInputValue("deadline")}\n**Rate:** ${modal.fields.getTextInputValue("rate")}`)
          .setFooter({text: `Discord order by ${modal.user.username}`})
          .setTimestamp();

        const discordRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("discord-finish")
              .setLabel("Finish order")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId("discord-cancel")
              .setLabel("Cancel order")
              .setStyle(ButtonStyle.Danger)
          );
        await discordChannel.send({content:`<@${modal.user.id}>`,embeds: [discordEmbed], components: [discordRow]});
        
        await modal.reply({ content: "Your order has been sent.", ephemeral: true });
        break;
      case "modal-recruitment":
        const recruitmentCategory = modal.guild!.channels.cache.find(
          (c) =>
            c.name === "Applications" && c.type === ChannelType.GuildCategory
        ) as CategoryChannel;
        if (!recruitmentCategory) return;

        const recruitmentChannel = await modal.guild!.channels.create({
          name: `recruitment-${modal.user.username}`,
          type: ChannelType.GuildText,
          parent: recruitmentCategory,
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
              id: config.roles.recruitment,
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ViewChannel,
              ],
            },
          ],
        });
        const recruitmentEmbed = new EmbedBuilder()
          .setColor("#313338")
          .setAuthor({iconURL: modal.user.displayAvatarURL(), name: modal.user.username})
          .setDescription(`**Age:** ${modal.fields.getTextInputValue("age")}\n**About:** ${modal.fields.getTextInputValue("about")}\n**Why:** ${modal.fields.getTextInputValue("why")}`)
          .setFooter({text: `Application by ${modal.user.username}`})
          .setTimestamp();

        const recruitmentRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("recruitment-accept-staff")
              .setLabel("Accept")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId("recruitment-deny")
              .setLabel("Deny")
              .setStyle(ButtonStyle.Danger)
          );
        await recruitmentChannel.send({content:`<@${modal.user.id}>`,embeds: [recruitmentEmbed], components: [recruitmentRow]});

        await modal.reply({ content: "Your application has been sent.", ephemeral: true });
        break;
      case "recruitment-deny":
        const reason = modal.fields.getTextInputValue("recruitment-deny")
        
        const channel = modal.channel as TextChannel;

        const embed = new EmbedBuilder()
          .setColor("#313338")
          .setAuthor({iconURL: modal.user.displayAvatarURL(), name: modal.user.username})
          .setDescription(`Your application has been denied.\n**Reason:** ${reason}`)
          .setFooter({text: `Application by ${modal.user.username}`})
          .setTimestamp();

        const row = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("recruitment-deny-user")
              .setLabel("Close application")
              .setStyle(ButtonStyle.Danger)
          );
        await channel.send({content:`<@${modal.user.id}>`,embeds: [embed], components: [row]});

        await modal.reply({ content: "You have succesfully denied the application.", ephemeral: true });
        break;
    }
  }
}

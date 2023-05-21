import type {ShewenyClient} from "sheweny";
import {Button} from "sheweny";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
  GuildMember,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import config from "../../config";

export class className extends Button {
  constructor(client: ShewenyClient) {
    super(client, [
      "recruitment-accept-staff",
      "recruitment-accept-user",
      "recruitment-deny",
      "recruitment-deny-user",
    ]);
  }

  execute(button: ButtonInteraction) {
    if (button.customId === "recruitment-accept-staff") {
      const member = button.member as GuildMember;

      if (member.permissions.has("Administrator")) {
        const embed = new EmbedBuilder()
          .setColor("#00ff00")
          .setAuthor({
            name: button.user.tag,
            iconURL: button.user.displayAvatarURL(),
          })
          .setDescription(
            "A staff member has accepted the application, do you want to accept it ?"
          )
          .setTimestamp();

        const row = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("recruitment-accept-user")
              .setLabel("Accept")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId("recruitment-deny-user")
              .setLabel("Deny")
              .setStyle(ButtonStyle.Danger)
          );
        button.reply({
          embeds: [embed],
          components: [row],
        });
      }
    }
    if (button.customId === "recruitment-accept-user") {
      const recruitmentFeedback = button.guild!.channels.cache.get(
        config.channelsId.recruitmentFeedback
      ) as TextChannel;

      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setAuthor({
          name: button.user.tag,
          iconURL: button.user.displayAvatarURL(),
        })
        .setDescription(
          `Welcome <@${button.user.id}> to the team ! You are now a staff member !`
        )
        .setTimestamp();

      recruitmentFeedback.send({
        embeds: [embed],
      });

      // delete the channel
      const recruitmentChannel = button.guild!.channels.cache.get(
        button.channelId
      ) as TextChannel;
      recruitmentChannel.delete();
    }
    if (button.customId === "recruitment-deny-user") {
      const recruitmentChannel = button.guild!.channels.cache.get(
        button.channelId
      ) as TextChannel;
      recruitmentChannel.delete();
    }
    if (button.customId === "recruitment-deny") {
      const member = button.member as GuildMember;

      if (!member.permissions.has("Administrator")) return;
      const modal = new ModalBuilder()
        .setTitle("Deny reason")
        .setCustomId("recruitment-deny");

      const reason = new TextInputBuilder()
        .setCustomId("recruitment-deny")
        .setPlaceholder("Reason")
        .setMinLength(1)
        .setLabel("Reason")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph);

      const firstActionRowRecruitment =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          reason
        );

      modal.addComponents(firstActionRowRecruitment);

      button.showModal(modal);
    }
  }
}

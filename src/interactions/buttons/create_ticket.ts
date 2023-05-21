import type {ShewenyClient} from "sheweny";
import {Button} from "sheweny";
import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export class Ticket extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["fivem", "spigot", "web", "discord", "recruitment"]);
  }

  async execute(button: ButtonInteraction) {
    switch (button.customId) {
      case "fivem":
        const modal = new ModalBuilder()
          .setTitle("Please fill out the following form")
          .setCustomId("modal-fivem");

        const type = new TextInputBuilder()
          .setCustomId("type")
          .setPlaceholder(
            "Type of service ( script creation, server creation, script modification, etc... )"
          )
          .setMinLength(3)
          .setMaxLength(100)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Type of service");

        const description = new TextInputBuilder()
          .setCustomId("description")
          .setPlaceholder("Description of your request")
          .setMinLength(3)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setLabel("Description of your request");

        const deadline = new TextInputBuilder()
          .setCustomId("deadline")
          .setPlaceholder("Exemple : 10/10/2021")
          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Deadline of your request");

        const rate = new TextInputBuilder()
          .setCustomId("rate")
          .setPlaceholder("Exemple : 200€")
          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Rate of your request");

        const firstActionRow =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            type
          );
        const secondActionRow =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            description
          );
        const thirdActionRow =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            deadline
          );
        const fourthActionRow =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            rate
          );

        modal.addComponents(
          firstActionRow,
          secondActionRow,
          thirdActionRow,
          fourthActionRow
        );

        await button.showModal(modal);
        break;
      case "spigot":
        const modalSpigot = new ModalBuilder()
          .setTitle("Please fill out the following form")
          .setCustomId("modal-spigot");

        const typeSpigot = new TextInputBuilder()
          .setCustomId("type")
          .setPlaceholder(
            "Type of service ( plugin creation, plugin modification, etc... )"
          )
          .setMinLength(3)
          .setMaxLength(100)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Type of service");

        const descriptionSpigot = new TextInputBuilder()
          .setCustomId("description")
          .setPlaceholder("Description of your request")
          .setMinLength(3)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setLabel("Description of your request");

        const deadlineSpigot = new TextInputBuilder()
          .setCustomId("deadline")
          .setPlaceholder("Exemple : 10/10/2021")
          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Deadline of your request");

        const rateSpigot = new TextInputBuilder()
          .setCustomId("rate")
          .setPlaceholder("Exemple : 200€")
          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Rate of your request");

        const firstActionRowSpigot =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            typeSpigot
          );
        const secondActionRowSpigot =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            descriptionSpigot
          );
        const thirdActionRowSpigot =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            deadlineSpigot
          );
        const fourthActionRowSpigot =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            rateSpigot
          );

        modalSpigot.addComponents(
          firstActionRowSpigot,
          secondActionRowSpigot,
          thirdActionRowSpigot,
          fourthActionRowSpigot
        );

        await button.showModal(modalSpigot);
        break;
      case "web":
        const modalWeb = new ModalBuilder()
          .setTitle("Please fill out the following form")
          .setCustomId("modal-web");

        const typeWeb = new TextInputBuilder()
          .setCustomId("type")
          .setPlaceholder("Type of service ( website creation, etc... )")
          .setMinLength(3)
          .setMaxLength(100)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Type of service");

        const descriptionWeb = new TextInputBuilder()
          .setCustomId("description")
          .setPlaceholder("Description of your request")
          .setMinLength(3)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setLabel("Description of your request");

        const deadlineWeb = new TextInputBuilder()
          .setCustomId("deadline")
          .setPlaceholder("Exemple : 10/10/2021")

          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Deadline of your request");

        const rateWeb = new TextInputBuilder()
          .setCustomId("rate")
          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Rate of your request")
          .setPlaceholder("Exemple : 200€");

        const firstActionRowWeb =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            typeWeb
          );
        const secondActionRowWeb =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            descriptionWeb
          );
        const thirdActionRowWeb =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            deadlineWeb
          );
        const fourthActionRowWeb =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            rateWeb
          );

        modalWeb.addComponents(
          firstActionRowWeb,
          secondActionRowWeb,
          thirdActionRowWeb,
          fourthActionRowWeb
        );

        await button.showModal(modalWeb);
        break;
      case "discord":
        const modalDiscord = new ModalBuilder()
          .setTitle("Please fill out the following form")
          .setCustomId("modal-discord");

        const typeDiscord = new TextInputBuilder()
          .setCustomId("type")
          .setPlaceholder("Type of service ( bot creation, etc... )")
          .setMinLength(3)
          .setMaxLength(100)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Type of service");

        const descriptionDiscord = new TextInputBuilder()
          .setCustomId("description")
          .setPlaceholder("Description of your request")
          .setMinLength(3)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setLabel("Description of your request");

        const deadlineDiscord = new TextInputBuilder()
          .setCustomId("deadline")
          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Deadline of your request")
          .setPlaceholder("Exemple : 10/10/2021");

        const rateDiscord = new TextInputBuilder()
          .setCustomId("rate")
          .setMinLength(3)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Rate of your request")
          .setPlaceholder("Exemple : 200€");

        const firstActionRowDiscord =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            typeDiscord
          );
        const secondActionRowDiscord =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            descriptionDiscord
          );
        const thirdActionRowDiscord =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            deadlineDiscord
          );
        const fourthActionRowDiscord =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            rateDiscord
          );

        modalDiscord.addComponents(
          firstActionRowDiscord,
          secondActionRowDiscord,
          thirdActionRowDiscord,
          fourthActionRowDiscord
        );

        await button.showModal(modalDiscord);

        break;
      case "recruitment":
        const modalRecruitment = new ModalBuilder()
          .setTitle("Please fill out the following form")
          .setCustomId("modal-recruitment");

        const ageRecruitment = new TextInputBuilder()
          .setCustomId("age")
          .setPlaceholder("Exemple : 18")
          .setMinLength(1)
          .setMaxLength(2)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setLabel("Age");

        const aboutYouRecruitment = new TextInputBuilder()
          .setCustomId("about")
          .setPlaceholder("Tell us about you")
          .setMinLength(3)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setLabel("About you");

        const whyYouRecruitment = new TextInputBuilder()
          .setCustomId("why")
          .setPlaceholder("Why do you want to join us ?")
          .setMinLength(3)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setLabel("Why do you want to join us ?");

        const firstActionRowRecruitment =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            ageRecruitment
          );
        const secondActionRowRecruitment =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            aboutYouRecruitment
          );
        const thirdActionRowRecruitment =
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            whyYouRecruitment
          );

        modalRecruitment.addComponents(
          firstActionRowRecruitment,
          secondActionRowRecruitment,
          thirdActionRowRecruitment
        );

        await button.showModal(modalRecruitment);
        break;
    }
  }
}

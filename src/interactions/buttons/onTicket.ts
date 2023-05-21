import type {ShewenyClient} from "sheweny";
import {Button} from "sheweny";
import {AttachmentBuilder, ButtonInteraction, GuildMember, TextChannel,} from "discord.js";
import {ticketCloseLogs} from "../../functions/logs";

export class OnTicketButtons extends Button {
  constructor(client: ShewenyClient) {
    super(client, [
      "fivem-cancel",
      "discord-cancel",
      "web-cancel",
      "spigot-cancel",
      "fivem-finish",
      "discord-finish",
      "web-finish",
      "spigot-finish",
    ]);
  }

  async execute(button: ButtonInteraction) {
    const {customId, channel, member} = button;

    let replyContent = "";

    if (
      customId === "fivem-cancel" ||
      customId === "discord-cancel" ||
      customId === "web-cancel" ||
      customId === "spigot-cancel"
    ) {
      replyContent = "Your ticket has been canceled";
    } else if (
      customId === "fivem-finish" ||
      customId === "discord-finish" ||
      customId === "web-finish" ||
      customId === "spigot-finish"
    ) {
      replyContent = "Your ticket has been closed";
    }

    if (replyContent) {
      button.reply({
        content: replyContent,
        ephemeral: true,
      });
    }
    if (channel instanceof TextChannel) {
      const messages = await channel.messages.fetch({limit: 100});
      const transcript = messages
        .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
        .map(
          (msg) =>
            `<p>[${msg.createdAt.toISOString()}] <strong>${
              msg.author.tag
            }:</strong> ${msg.content}</p>`
        )
        .join("\n");

      const html = `
        <html>
          <head>
            <title>Transcript du ticket</title>
          </head>
          <body>
            ${transcript}
          </body>
        </html>
      `;

      const attachment = new AttachmentBuilder(Buffer.from(html), {
        name: "transcript.html",
      });

      ticketCloseLogs(this.client, member as GuildMember, attachment);

      await channel.delete();
    }
  }
}

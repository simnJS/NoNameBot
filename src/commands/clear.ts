import type {ShewenyClient} from "sheweny";
import {Command} from "sheweny";
import {ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextChannel,} from "discord.js";
import config from "../config";
import Logger from "../utils/Logger";

export class ClearCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "clear",
      description: "Allow you to clear messages",
      userPermissions: ["ManageMessages"],
      clientPermissions: ["ManageMessages"],
      options: [
        {
          name: "amount",
          description: "Amount of messages to clear",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
        {
          name: "reason",
          description: "Reason of the clear",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  execute(i: CommandInteraction) {
    const amount = i.options.get("amount")?.value as number;
    const reason = i.options.get("reason")?.value as string;
    const channel = i.channel as TextChannel;
    if (!channel) return;

    if (amount < 1 || amount > 100)
      return i.reply({
        content: "You must specify an amount between 1 and 100",
        ephemeral: true,
      });

    channel
      .bulkDelete(amount)
      .then(() => {
        i.reply({content: `${amount} messages deleted`, ephemeral: true});

        const logChannel = this.client.channels.cache.get(config.channelsId.logs) as TextChannel;
        if (!logChannel) return;

        const embed = new EmbedBuilder()
          .setColor("#2ecc71")
          .setAuthor({iconURL: i.user.displayAvatarURL(), name: i.user.tag})
          .setDescription(`**Action**: Clear\n**Amount**: ${amount}\n**Reason**: ${reason}\n**Channel**: <#${channel.id}>\n**Moderator**: ${i.user.tag}`)
          .setTimestamp()
          .setFooter({
            text: `${config.general?.author}`,
            iconURL: this.client.user!.displayAvatarURL()!,
          });

        logChannel.send({embeds: [embed]});
      })
      .catch((err) => {
        Logger.error(err);
      });
  }
}

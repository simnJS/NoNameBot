import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, TextChannel } from "discord.js";
import { ShewenyClient } from "sheweny";
import config from "../config";

async function deployAutoRole(client : ShewenyClient) {
    const channel : TextChannel = client.channels.cache.get(config.channelsId.autoroles) as TextChannel;

    const guild = client.guilds.cache.get(config.general!.guildId);

    const minecraftEmoji = client.emojis.cache.get(config.Emojis.spigotAccess);
    const discordEmoji = client.emojis.cache.get(config.Emojis.discordAccess);
    const webEmoji = client.emojis.cache.get(config.Emojis.webAccess);
    const fiveMEmoji = client.emojis.cache.get(config.Emojis.fiveMAccess);

    const minecraftRole = guild!.roles.cache.get(config.roles.spigotAccess);
    const discordRole = guild!.roles.cache.get(config.roles.discordAccess);
    const webRole = guild!.roles.cache.get(config.roles.webAccess);
    const fiveMRole = guild!.roles.cache.get(config.roles.fiveMAccess);

    const embed = new EmbedBuilder()
        .setColor("#313338")
        .setTitle("Auto roles")
        .setDescription(`Press button under this message to get your roles. You can get them back at any time by pressing the button again.\n\n${minecraftEmoji} - ${minecraftRole?.toString()}\n${discordEmoji} - ${discordRole?.toString()}\n${webEmoji} - ${webRole?.toString()}\n${fiveMEmoji} - ${fiveMRole?.toString()}`)
        .setFooter({ text: "No Name", iconURL: client.user?.displayAvatarURL()! })
        .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId("spigot")
            .setLabel("Spigot")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(minecraftEmoji!.id),
        new ButtonBuilder()
            .setCustomId("discord")
            .setLabel("Discord")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(discordEmoji!.id),
        new ButtonBuilder()
            .setCustomId("web")
            .setLabel("Web")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(webEmoji!.id),
        new ButtonBuilder()
            .setCustomId("fivem")
            .setLabel("FiveM")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(fiveMEmoji!.id),
    );

    const messages = await channel.messages.fetch();
    const message = messages.find((m) => m.author.id === client.user!.id && m.embeds[0]?.title === "Auto roles");

    if (message) {
        message.edit({ embeds: [embed], components: [row] });
    }
    else {
        channel.send({ embeds: [embed], components: [row] });
    }
}

export default deployAutoRole;


import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CategoryChannel,
  ChannelType,
  EmbedBuilder,
  GuildEmoji,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import {ShewenyClient} from "sheweny";
import config from "../config";

async function deployAutoRole(client: ShewenyClient) {
  const channel: TextChannel = client.channels.cache.get(
    config.channelsId.autoroles
  ) as TextChannel;

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
    .setDescription(
      `Press button under this message to get your roles. You can get them back at any time by pressing the button again.\n\n${minecraftEmoji} - ${minecraftRole?.toString()}\n${discordEmoji} - ${discordRole?.toString()}\n${webEmoji} - ${webRole?.toString()}\n${fiveMEmoji} - ${fiveMRole?.toString()}`
    )
    .setFooter({
      text: `${config.general?.author}`,
      iconURL: client.user?.displayAvatarURL()!,
    })
    .setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("spigot-role")
      .setLabel("Spigot")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(minecraftEmoji!.id),
    new ButtonBuilder()
      .setCustomId("discord-role")
      .setLabel("Discord")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(discordEmoji!.id),
    new ButtonBuilder()
      .setCustomId("web-role")
      .setLabel("Web")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(webEmoji!.id),
    new ButtonBuilder()
      .setCustomId("fivem-role")
      .setLabel("FiveM")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(fiveMEmoji!.id)
  );

  const messages = await channel.messages.fetch();
  const message = messages.find(
    (m) =>
      m.author.id === client.user!.id && m.embeds[0]?.title === "Auto roles"
  );

  if (message) {
    message.edit({embeds: [embed], components: [row]});
  } else {
    channel.send({embeds: [embed], components: [row]});
  }
}

async function deployRules(client: ShewenyClient) {
  const channel: TextChannel = client.channels.cache.get(
    config.channelsId.rules
  ) as TextChannel;

  const offTopic = client.channels.cache.get(
    config.channelsId.ofTopics
  ) as TextChannel;
  const embed = new EmbedBuilder()
    .setColor("#2ecc71")
    .setTitle("Rules")
    .setDescription(
      `🌟 Welcome to NoName ! 🌟

      NoName is a community dedicated to development and design, providing a supportive environment for creators!
      
      To ensure a pleasant experience for everyone, please abide by the following rules:
      
      📜 **Server Rules:**
      
      1️⃣ Follow Discord's Terms of Service. As a Discord server, it is essential to adhere to the Discord [Terms of Service](https://discordapp.com/terms) and [Community Guidelines](https://discord.com/guidelines).
      
      2️⃣ Be respectful to other members. No harassment, hate speech, or harmful behavior. Remember, no means no.
      
      3️⃣ No adult content (NSFW). We are a public Discord server, catering to diverse audiences, so explicit content is strictly prohibited.
      
      4️⃣ Avoid "ghost pings," which means mentioning someone and then deleting the message. Also, refrain from randomly mentioning members.
      
      5️⃣ No advertising allowed, unless specifically authorized by the staff.
      
      6️⃣ No spam, flooding, excessive trolling, or disruptive behavior. Let's maintain a healthy environment for all members.
      
      7️⃣ Respect the purpose of each channel. If you wish to engage in off-topic discussions, please use the ${offTopic}.
      
      8️⃣ Do not use the server as a directory. Avoid seeking help or making requests directly via private messages. Utilize the appropriate channels provided.
      
      9️⃣ Do not disclose private information unless expressly authorized by the person involved.
      
      📝 **Requests and Contributions:**
      
      🔹 Always credit the author if you share content that doesn't belong to you. Plagiarism is not tolerated.
      
      🔹 Write detailed requests. It saves time for everyone. Provide specific details and establish at least one or two precise requirements for your request. If applicable, clearly state your budget.
      
      🔹 If you are interested in our services, feel free to place an order in the appropriate channels.
      
      🌟 Have fun and enjoy your experience in NoName ! 🌟`
    )
    .setFooter({
      text: `${config.general?.author}`,
      iconURL: client.user?.displayAvatarURL()!,
    });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("accept")
      .setLabel("Accept rules")
      .setStyle(ButtonStyle.Success)
      .setEmoji("✅"),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("Terms of Service")
      .setURL("https://discordapp.com/terms"),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("Community Guidelines")
      .setURL("https://discord.com/guidelines")
  );

  const messages = await channel.messages.fetch();
  const message = messages.find(
    (m) => m.author.id === client.user!.id && m.embeds[0]?.title === "Rules"
  );

  if (message) {
    message.edit({embeds: [embed], components: [row]});
  } else {
    channel.send({embeds: [embed], components: [row]});
  }
}

async function deployTicket(client: ShewenyClient, type: string) {
  const ticketInfo: {
    [key: string]: {
      emoji: GuildEmoji | undefined;
      channelId: string;
      title: string;
    };
  } = {
    Spigot: {
      emoji: client.emojis.cache.get(config.Emojis.spigotAccess),
      channelId: config.channelsId.spigotTicket,
      title: "Spigot ticket",
    },
    FiveM: {
      emoji: client.emojis.cache.get(config.Emojis.fiveMAccess),
      channelId: config.channelsId.fiveMTicket,
      title: "FiveM ticket",
    },
    Web: {
      emoji: client.emojis.cache.get(config.Emojis.webAccess),
      channelId: config.channelsId.webTicket,
      title: "Web ticket",
    },
    Discord: {
      emoji: client.emojis.cache.get(config.Emojis.discordAccess),
      channelId: config.channelsId.discordTicket,
      title: "Discord ticket",
    },
  };

  const {emoji, channelId, title} = ticketInfo[type] as {
    emoji: GuildEmoji | undefined;
    channelId: string;
    title: string;
  };

  const channel: TextChannel = client.channels.cache.get(
    channelId
  ) as TextChannel;

  const embed = new EmbedBuilder()
    .setColor("#313338")
    .setTitle(title)
    .setDescription(
      `🌟 Welcome to the ${type} order ! 🌟

      📝 **How to create an order:**
      
      🔹 Click on the button below to create an order.
      
      🔹 Select the category corresponding to your request.
      
      🔹 Describe your request as precisely as possible.
      
      🔹 Wait for a developer to contact you.
      
      🔹 Once your request is completed, the developer will close the ticket.
      
      🌟 Have fun and enjoy your experience in NoName ! 🌟`
    )
    .setFooter({
      text: `${config.general?.author}`,
      iconURL: client.user?.displayAvatarURL()!,
    });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(type.toLowerCase())
      .setLabel("Make an order")
      .setStyle(ButtonStyle.Success)
      .setEmoji(emoji!.id)
  );

  const messages = await channel.messages.fetch();
  const message = messages.find(
    (m) => m.author.id === client.user!.id && m.embeds[0]?.title === title
  );

  if (message) {
    message.edit({embeds: [embed], components: [row]});
  } else {
    channel.send({embeds: [embed], components: [row]});
  }
}

async function createCategory(client: ShewenyClient) {
  const guild = client.guilds.cache.get(config.general!.guildId);
  const categoryData = [
    {
      name: "Spigot orders",
      devRole: config.roles.spigotDev,
    },
    {
      name: "FiveM orders",
      devRole: config.roles.fiveMDev,
    },
    {
      name: "Web orders",
      devRole: config.roles.webDev,
    },
    {
      name: "Discord orders",
      devRole: config.roles.discordDev,
    },
    {
      name: "Applications",
      devRole: config.roles.recruitment,
    },
  ];

  for (const category of categoryData) {
    const existingCategory = guild?.channels.cache.find(
      (c) => c.name === category.name && c.type === ChannelType.GuildCategory
    ) as CategoryChannel;

    if (!existingCategory) {
      await guild?.channels.create({
        name: category.name,
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
          {
            id: guild.roles.everyone.id,
            deny: [
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ViewChannel,
            ],
          },
        ],
      });
    }
  }
}

async function deployRecruitmentMessage(client: ShewenyClient) {
  const channel: TextChannel = client.channels.cache.get(
    config.channelsId.recruitment
  ) as TextChannel;

  const embed = new EmbedBuilder()
    .setColor("#313338")
    .setTitle("Recruitment")
    .setDescription(
      `🌟 Welcome to the recruitment channel! 🌟

    📝 **How to apply:**
    
    🔹 Click on the button below to create an application.
    
    🔹 Select the category corresponding to your request.
    
    🔹 Fill out the form.
    
    🔹 Wait for a staff member to contact you.
    
    🔹 Once your request is completed, the staff member will close the ticket.

    📌 **Recruitment Requirements:**

    🔸 Must be at least 16 years old.
    
    🔸 Fluent in English, both spoken and written.
    
    🔸 Previous experience in a similar role is preferred.
    
    🔸 Strong communication and teamwork skills.
    
    🔸 Availability to dedicate a minimum of 10 hours per week.
    
    🔸 Familiarity with our community and its rules.
    
    🌟 Have fun and enjoy your experience in NoName! 🌟`
    )
    .setFooter({
      text: `${config.general?.author}`,
      iconURL: client.user?.displayAvatarURL()!,
    });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("recruitment")
      .setLabel("Make an application")
      .setStyle(ButtonStyle.Success)
      .setEmoji("📝")
  );

  const messages = await channel.messages.fetch();
  const message = messages.find(
    (m) =>
      m.author.id === client.user!.id && m.embeds[0]?.title === "Recruitment"
  );

  if (message) {
    message.edit({embeds: [embed], components: [row]});
  } else {
    channel.send({embeds: [embed], components: [row]});
  }
}

export {
  deployAutoRole,
  deployRules,
  createCategory,
  deployTicket,
  deployRecruitmentMessage,
};

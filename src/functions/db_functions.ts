import { GuildMember, Guild } from "discord.js";
import prisma_instance from "../utils/prisma_instance";
import { ShewenyClient } from "sheweny";
import Logger from "../utils/Logger";

async function createDbGuildMember(guildMember: GuildMember, guild: Guild) {
  const userExist = await prisma_instance.guildMember.findFirst({
    where: {
      discordId: guildMember.id,
    },
  });

  if (userExist) return;

  await prisma_instance.guildMember.create({
    data: {
      discordId: guildMember.id,
      username: guildMember.user.username,
      guild: {
        connect: {
          guildId: guild.id,
        },
      },
      level: {
        create: {
          level: 1,
          xp: 0,
        },
      },
    },
  });
  Logger.info(`New user added to the database: ${guildMember.user.username}(${guildMember.id})`);
}

async function createDbGuild(guild: Guild) {
  const existingGuild = await prisma_instance.guild.findUnique({
    where: {
      guildId: guild.id,
    },
  });

  if (existingGuild) {
    // Add any necessary updates for existing guild
    Logger.info(`Existing guild updated in the database: ${guild.name}(${guild.id})`);
    return;
  }

  await prisma_instance.guild.create({
    data: {
      guildId: guild.id,
      guildName: guild.name,
    },
  });
  Logger.info(`New guild added to the database: ${guild.name}(${guild.id})`);
}

async function checkIfGuildExist(client: ShewenyClient) {
  const guilds = client.guilds.cache;

  for (const guild of guilds.values()) {
    await createDbGuild(guild);
  }
}

async function checkIfGuildMemberExist(client: ShewenyClient) {
  const guilds = client.guilds.cache;

  // get all users from all guilds
  for (const guild of guilds.values()) {
    const members = guild.members.fetch();

    for (const member of (await members).values()) {
      await createDbGuildMember(member, guild);
    }
  }
}

export {
  createDbGuildMember,
  createDbGuild,
  checkIfGuildExist,
  checkIfGuildMemberExist,
};

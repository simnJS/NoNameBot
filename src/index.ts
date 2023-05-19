import {ShewenyClient} from "sheweny";
import dotenv from "dotenv";
import config from "./config";
import { Partials } from "discord.js";

dotenv.config();
const client = new ShewenyClient({
  intents: [38531],
  admins: [config.general!.admins[0]],
  mode: "development",
  partials: [Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User, Partials.Channel],
  managers: {
    commands: {
      directory: "./commands",
      guildId: [config.general!.guildId],
      prefix: "/",
      autoRegisterApplicationCommands: true,
      applicationPermissions: true,
      default: {
        userPermissions: ["UseApplicationCommands"],
        registerApplicationCommand: true,
      },
    },
    events: {
      directory: "./events",
    },
    buttons: {
      directory: "./interactions/buttons",
    },
    selectMenus: {
      directory: "./interactions/selectmenus",
    },
    modals: {
      directory: "./interactions/modals",
    },
  },
});

client.managers
  .commands!.on("cooldownLimit", (interaction) => {
    return interaction.reply({
      content:
        "Respirez, calmez-vous, tout va bien se passer. Inutile de vouloir me surcharger de travail !",
      ephemeral: true,
    });
  })
  .on("userMissingPermissions", (interaction, missing) => {
    return interaction.reply({
      content: `Vous n'avez pas la permission d'utiliser cette commande (${missing}) !`,
      ephemeral: true,
    });
  });

client.login(process.env.DISCORD_TOKEN!);
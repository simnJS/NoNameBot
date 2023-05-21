import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import Logger from "../utils/Logger";
import { checkIfGuildExist, checkIfGuildMemberExist } from "../functions/db_functions";
import { createCategory, deployAutoRole, deployRecruitmentMessage, deployRules, deployTicket } from "../functions/deployment";

export class ReadyEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  execute() {
    Logger.info(`${this.client.user!.tag} is logged in`)
    checkIfGuildExist(this.client).then(() => checkIfGuildMemberExist(this.client));
    deployAutoRole(this.client);
    deployRules(this.client);
    createCategory(this.client);
    deployTicket(this.client, "Spigot");
    deployTicket(this.client, "FiveM");
    deployTicket(this.client, "Web");
    deployTicket(this.client, "Discord");
    deployRecruitmentMessage(this.client);
  }
};

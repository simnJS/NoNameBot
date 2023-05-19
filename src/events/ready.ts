import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import Logger from "../utils/Logger";
import { checkIfGuildExist, checkIfGuildMemberExist } from "../functions/db_functions";
import { deployAutoRole, deployRules } from "../functions/deployment";

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
    checkIfGuildExist(this.client);
    checkIfGuildMemberExist(this.client);
    deployAutoRole(this.client);
    deployRules(this.client);
  }
};

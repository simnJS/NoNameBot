import { PrismaClient } from "@prisma/client";
import Logger from "./Logger";
declare global {
    var global_prisma_instance: PrismaClient;
}

let prisma_instance: PrismaClient;

if (!global.global_prisma_instance) {
    Logger.info("generating new Prisma instance")
    global.global_prisma_instance = new PrismaClient();
}

prisma_instance = global.global_prisma_instance;

export default prisma_instance;
interface ChannelsId {
    autoroles: string;
    logs: string;
    rules: string;
    ofTopics: string;
    spigotTicket: string;
    fiveMTicket: string;
    webTicket: string;
    discordTicket: string;
  }
  
  interface CategoryId {
  }
  
  interface Roles {
    discordAccess: string;
    spigotAccess: string;
    webAccess: string;
    fiveMAccess: string;
    acceptRules: string;
    discordDev : string;
    spigotDev : string;
    webDev : string;
    fiveMDev : string;
  }

  interface Emojis {
    discordAccess: string;
    spigotAccess: string;
    webAccess: string;
    fiveMAccess: string;
  }
  
  interface General {
    guildId: string;
    admins: string[];
    author: string;
  }
  
  
  export interface Config {
    channelsId: ChannelsId;
    roles: Roles;
    Emojis: Emojis;
    categoriesId?: CategoryId;
    general?: General;
  }
  
  const config: Config = {
    channelsId: {
      autoroles: "1108131551214063636",
      logs: "1109217097214611527",
      rules: "1097154814556786761",
      ofTopics: "1097136969915564122",
      spigotTicket: "1108129870044737536",
      fiveMTicket: "1108129745784283190",
      webTicket: "1108129358075412530",
      discordTicket: "1108890245006639186",
    },
    roles: {
      discordAccess: "1108885319966801951",
      spigotAccess: "1108885387188899870",
      webAccess: "1108885472186478623",
      fiveMAccess: "1108885413562691725",
      acceptRules: "1108883946378375278",
      discordDev : "1108890245006639186",
      spigotDev : "1108129191880310785",
      webDev : "1108128963047477331",
      fiveMDev : "1108129147580067860",
    },
    Emojis: {
      discordAccess: "1109073394667884544",
      spigotAccess: "1109073944939602031",
      webAccess: "1109073661694050404",
      fiveMAccess: "1109072872225374208",
    },
    categoriesId: {
    },
    general: {
      guildId: "1097130373923733554",
      admins: ["238299830940598272"],
      author: "© 2023 - No Name"
    },
  };
  
  export default config;
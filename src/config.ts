interface ChannelsId {
    autoroles: string;
  }
  
  interface CategoryId {
  }
  
  interface Roles {
    discordAccess: string;
    spigotAccess: string;
    webAccess: string;
    fiveMAccess: string;
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
    },
    roles: {
      discordAccess: "1108885319966801951",
      spigotAccess: "1108885387188899870",
      webAccess: "1108885472186478623",
      fiveMAccess: "1108885413562691725",
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
      admins: ["238299830940598272"]
    },
  };
  
  export default config;
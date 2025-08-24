const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});


const targetUserId = "755330637581385769";

// 🟢 Quando o bot ficar online
client.once("ready", () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// 🔄 Detecta mudanças no estado de voz
client.on("voiceStateUpdate", async (oldState, newState) => {
    // Verifica se o usuário alvo entrou em um canal de voz
    if (newState.member && newState.id === targetUserId && newState.channel) {
        try {
            await newState.disconnect();
            console.log(`Removi ${newState.member.user.tag} da call`);
        } catch (err) {
            console.error("Erro ao tentar remover:", err);
        }
    }
});

client.login(process.env.TOKEN);

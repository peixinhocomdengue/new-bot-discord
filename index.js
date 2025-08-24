// 🌐 Servidor Express para manter o bot acordado no Render
const express = require('express');
const app = express();

// Render exige que você use a porta fornecida via variável de ambiente
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot está vivo!'));
app.listen(PORT, () => console.log(`Servidor de ping ativo na porta ${PORT}`));

// 🤖 Bot do Discord
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
    if (newState.member && newState.id === targetUserId && newState.channel) {
        try {
            await newState.disconnect();
            console.log(`Removi ${newState.member.user.tag} da call`);
        } catch (err) {
            console.error("Erro ao tentar remover:", err);
        }
    }
});

// 🔐 Login com o token do bot
client.login(process.env.TOKEN);

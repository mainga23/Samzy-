const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info")
    const sock = makeWASocket({
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    // Respond to messages
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0]
        if (!msg.message) return
        const from = msg.key.remoteJid
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (text) {
            console.log("Received:",

import { Client, GatewayIntentBits } from "discord.js";
import dbInit from "./database.js";
import apiInit from "./api.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const supabase = dbInit();
const api = apiInit();

client.once("ready", () => {
    console.log("Bot is online!");
});

client.on("messageCreate", async (message) => {
    if (message.content.includes("!card") && !message.author.bot) {
        const parts = message.content.split(" ");
        const rest = parts.slice(1).join(" ");

        if (rest.includes("help")){
            message.reply("Type `!card {card name}` to do a quick look up of a card.");
        }
        else{
            try {
                const { data, error } = await supabase
                    .from("card_printing")
                    .select("image_url")
                    .ilike("card_name", `%${rest}%`)
                    .neq("set_id", "1HP")
                    .order("card_pitch", { ascending: true });
    
                if (error) {
                    console.error("Supabase query error:", error);
                    message.reply("Error. Try again.");
                } else if (data.length === 0) {
                    message.reply("No card found.");
                } else {
                    message.reply(data[0].image_url);
                }
            } catch (err) {
                console.error("Error occurred while processing the request:", err);
                message.reply(
                    "An unexpected error occurred. Please try again later.",
                );
            }
        }
    }
});

client.login(process.env.discord_bot_key);

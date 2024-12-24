import {Command, Declare} from 'seyfert';
import { Embed } from 'seyfert/lib/builders';
import {EmbedColors} from "seyfert/lib/common";
import type {GuildCommandContext} from "seyfert";
import {MessageFlags} from "seyfert/lib/types";
import { pool } from '../index';
const crypto = require('crypto');

@Declare({
    name: 'link',
    description: 'Link your Discord account to Minecraft'
})
export default class LinkCommand extends Command {
    async run(ctx: GuildCommandContext) {
        try {
            const discordId = ctx.author.id;
            const guild = await ctx.guild('flow');

            // Check if user is already linked
            const existingLink = await pool.query(
                'SELECT * FROM linked_accounts WHERE discord_id = $1',
                [discordId]
            );

            if (existingLink.rows.length > 0) {
                const embed = new Embed()
                    .setTitle("<:link:1321031398416449556>  **Account Already Linked**")
                    .setDescription("Your Discord account is already linked to a Minecraft account!")
                    .setColor(EmbedColors.Red)
                    .setFooter({ text: guild.name, iconUrl: guild.iconURL() });

                return await ctx.editOrReply({ embeds: [embed], flags: MessageFlags.Ephemeral});
            }

            // Generate new hash and store request
            const hash = crypto.randomBytes(16).toString('hex');
            await pool.query(
                'INSERT INTO linking_requests (hash, discord_id, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'5 minutes\')',
                [hash, discordId]
            );

            const embed = new Embed()
                .setTitle("<:link:1321031398416449556>  **Account Linking**")
                .setDescription("Linking your account is easy, and brings amazing benefits!\n")
                .addFields(
                    {
                        name: "<:money:1321040182761230376> Rewards",
                        value: (
                            "\nDid you know linking your account offers so many benefits?\n" +
                            "<:bullet:1321038901116407870> **View all your homes** straight from Discord!\n" +
                            "<:bullet:1321038901116407870> **Check your in-game balance**\n" +
                            "<:bullet:1321038901116407870> **Earn in-game items** by participating in minigames!"
                        ),
                        inline: false
                    },
                    {
                        name: "<:KEY:1321041013904642058> 1 More Step!",
                        value: (
                            "To proceed, log into Minecraft and run the following command:\n" +
                            `\`\`\`yml
/link ${hash}
\`\`\``
                        ),
                        inline: false
                    }
                )
                .setImage("https://media.discordapp.net/attachments/1304430232899551303/1320640958567677982/mlszzinecraft_title.png?ex=676ba7bc&is=676a563c&hm=5f41add5f411555f850fcfaefbf053be179c99b0e619916a8b944e0f661e5545&=&format=webp&quality=lossless&width=569&height=229")
                .setFooter({ text: guild.name, iconUrl: guild.iconURL() })
                .setColor(EmbedColors.DiscordDark);

            return await ctx.editOrReply({ embeds: [embed], flags: MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error in link command:', error);
            const errorEmbed = new Embed()
                .setTitle("Error")
                .setDescription("An error occurred while processing your request. Please try again later.")
                .setColor(EmbedColors.Red);

            return await ctx.editOrReply({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral});
        }
    }
}
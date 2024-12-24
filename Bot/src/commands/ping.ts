import {Command, Declare} from 'seyfert';
import { Embed } from 'seyfert/lib/builders';
import {EmbedColors} from "seyfert/lib/common";
import type {GuildCommandContext} from "seyfert";

@Declare({
    name: 'ping',
    description: 'Returns the latency of the bot'
})
export default class PingCommand extends Command {

    async run(ctx: GuildCommandContext ) {
        const guild = await ctx.guild('flow');

        const ping = ctx.client.gateway.latency;

        const embed = new Embed()
            .setTitle("<:ping:1320639141452447845>  **Ping**")
            .setDescription(`
\`\`\`ansi
\x1b[1mGateway:\x1b[0m \x1b[36m${ping}\x1b[0m
\`\`\`
            `)
            .setFooter({ text: `${guild.name}`, iconUrl: guild.iconURL() })
            .setColor(EmbedColors.DiscordDark)

        return await ctx.editOrReply({ embeds: [embed] });
    }
}
import { Command, Declare} from 'seyfert';
import { Embed } from 'seyfert/lib/builders';
import { EmbedColors } from "seyfert/lib/common";
import type { GuildCommandContext } from "seyfert";

@Declare({
    name: 'count',
    description: 'Displays the rules for the counting channel'
})
export default class countCommand extends Command {


    async run(ctx: GuildCommandContext) {
        const countingChannelId = '1322384096374292530';
        const guild = await ctx.guild('flow');

        const embed = new Embed()
            .setTitle("<:count:1322385050909675572>  **Counting!**")
            .setDescription(`
                Welcome to the counting channel! Here are the rules to follow:
                
                <:bullet:1321038901116407870> You **cannot** count twice in a row. A new person must post the next number!
                
                <:bullet:1321038901116407870> You must post the next number in the sequence. For example, if the last number was \`5\`, you must type \`6\`.
                
                <:bullet:1321038901116407870> Feel free to use simple equations to move the counting forward! For example, you can say \`1 + 1\` to get \`2\`.
            `)
            .setImage("https://media.discordapp.net/attachments/1304430232899551303/1320640849125707776/ban.png?ex=677044e2&is=676ef362&hm=5e993d5fc63427fa3b13c3cc514cc851b06e90b9a99afc6f9cb012c2faee56c2&=&format=webp&quality=lossless&width=378&height=212")
            .setFooter({ text: `${guild.name}`, iconUrl: guild.iconURL() })
            .setColor(EmbedColors.DiscordDark);

        return ctx.client.messages.write(countingChannelId, { embeds: [embed] });
    }
}

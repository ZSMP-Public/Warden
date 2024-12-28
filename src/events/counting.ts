import { createEvent } from 'seyfert';
import { Embed } from 'seyfert/lib/builders';
import { EmbedColors } from 'seyfert/lib/common';

const channelCounts: Map<string, { count: number; userId: string }> = new Map();

function extractNumericalValue(input: string): number | null {
    try {
        const numberMatch = input.match(/-?\d+(\.\d+)?/);
        if (!numberMatch) return null;

        const numericValue = parseFloat(numberMatch[0]);
        return isFinite(numericValue) ? numericValue : null;
    } catch {
        return null;
    }
}

export default createEvent({
    data: { name: 'messageCreate' },
    run: async (message, client) => {
        if (message.author.bot) return;

        const countingChannelId = '1322384096374292530';

        const tickEmoji = { id: '1322374394605076600', name: 'tick' };
        const crossEmoji = { id: '1322376940094750760', name: 'cross' };

        if (message.channelId === countingChannelId) {
            const channelData = channelCounts.get(countingChannelId) || { count: 0, userId: '' };
            const currentCount = channelData.count;
            const lastUserId = channelData.userId;

            const messageNumber = extractNumericalValue(message.content);

            if (messageNumber === null) return;

            const embed = new Embed();

            if (messageNumber !== currentCount + 1) {
                channelCounts.set(countingChannelId, { count: 0, userId: '' });

                embed.setTitle('<:cross:1322376940094750760> Streak Broken!')
                    .setDescription(`<@${message.author.id}> screwed up the count at ${currentCount}. \nThe count resets to **1**.\n\n-# Wrong number! You were meant to type ${currentCount+1}!`)
                    .setColor(EmbedColors.Red);

                await message.react(crossEmoji);
                await client.messages.write(message.channelId, { embeds: [embed] });
                return;
            }

            if (message.author.id === lastUserId) {
                channelCounts.set(countingChannelId, { count: 0, userId: '' });

                embed.setTitle('<:cross:1322376940094750760> Streak Broken!')
                    .setDescription(`<@${message.author.id}> screwed up the count at ${currentCount}. \nThe count resets to **1**.\n\n-# You are not allowed to count twice in a row.`)
                    .setColor(EmbedColors.Red);

                await message.react(crossEmoji);
                await client.messages.write(message.channelId, { embeds: [embed] });
                return;
            }

            channelCounts.set(countingChannelId, { count: messageNumber, userId: message.author.id });

            return message.react(tickEmoji);
        }
    },
});

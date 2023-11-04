import { GrammyContext } from '$grammy/context.ts';
import { Composer } from 'grammy';
import config from '$utils/config.ts';
import { botInfo } from '$utils/constants.ts';
import { listOfCommands } from '$utils/grammy.ts';

const composer = new Composer<GrammyContext>();

composer.command('help', async (ctx) => {
	// array off values of botInfo.chats
	const chatIds = Object.values(botInfo.chats);
	const helpMsg = [
		`<b>Available Commands : </b>`,
		...listOfCommands
			.filter((c) =>
				ctx.chat.id === botInfo.topics[0] ||
					(ctx.from && config.admins.includes(ctx.from.id)) ||
					chatIds.includes(ctx.chat.id)
					? true
					: c.show
			)
			.map(({ command, description }) => `/${command} — ${description}`),
	].join('\n');

	return await ctx.replyWithHTML(helpMsg, {
		reply_markup: { remove_keyboard: true },
	});
});

export default composer;
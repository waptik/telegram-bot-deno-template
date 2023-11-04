import { getFullName } from '$utils/grammy.ts';

import { GrammyContext } from '$grammy/context.ts';
import { Composer } from 'grammy';

const composer = new Composer<GrammyContext>();

composer.command('start', async (ctx) => {
	try {
		await ctx.replyWithChatAction('typing');

		await ctx.replyWithHTML(
			`Hi ${
				getFullName(ctx.from!).replaceAll(
					'.',
					'',
				)
			} and welcome!\n\nYou can use the /help command to see the list of available commands.`,
			{ reply_markup: { remove_keyboard: true } },
		);
	} catch (e) {
		const msg = handleErrorMessage(e);
		await ctx.replyWithHTML(msg);
	}
});

composer.command('survey', async ctx =>{
	await ctx.reply(
		'You are about to start a survey. Use /cancel if you want to cancel the process',
	);
	
	await ctx.conversation.enter('survey');
})

export default composer;
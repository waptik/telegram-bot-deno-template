import { getFullName } from '$utils/grammy.ts';
import { handleErrorMessage } from '$grammy/helpers/mod.ts';

import { GrammyContext } from '$grammy/context.ts';
import { Composer } from 'grammy';
import { magicMenu } from "$grammy/handlers/menus/magic.menu.ts";

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
			{ reply_markup: magicMenu },
		);
	} catch (e) {
		const msg = handleErrorMessage(e);
		await ctx.replyWithHTML(msg);
	}
});

composer.command('quiz', async ctx =>{
	await ctx.reply(
		'You are about to start a quiz. Use /cancel if you want to cancel the process',
	);
	
	await ctx.conversation.enter('quiz');
})

export default composer;
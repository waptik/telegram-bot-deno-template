import { GrammyContext } from '$grammy/context.ts';
import { Composer } from 'grammy';

const composer = new Composer<GrammyContext>();

composer.command('cancel', async (ctx) => {
	await ctx.conversation.exit();
	await ctx.reply('The current operation has been cancelled.', {
		reply_markup: { remove_keyboard: true },
	});
});

export default composer;
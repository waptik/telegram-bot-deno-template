import { GrammyContext } from '$grammy/context.ts';
import config from '$utils/config.ts';
import { Bot, GrammyError, HttpError } from 'grammy';
import { conversations } from 'grammy_conversations';
import { hydrateReply } from 'grammy_parse_mode';
import { limit as rateLimit } from 'https://deno.land/x/grammy_ratelimiter@v1.2.0/mod.ts';
import { autoRetry } from 'https://esm.sh/@grammyjs/auto-retry@1.1.1';

import commands from '$grammy/handlers/commands/mod.ts';
import cancelCommand from '$grammy/handlers/commands/drop.ts';
import conversationComposer from '$grammy/handlers/conversations/mod.ts';
import ping from '$grammy/middleware/ping.ts';
import session from '$grammy/middleware/session.ts';
import { listOfCommands } from '$utils/grammy.ts';
import { isPrivate } from '$grammy/helpers/mod.ts';
import menus from '$grammy/handlers/menus/mod.ts';

export const grammy = new Bot<GrammyContext>(config.tokens.telegram);

// Plugins
grammy.api.config.use(hydrateFiles(config.tokens.telegram));
grammy.api.config.use(
	autoRetry({
		maxRetryAttempts: 5,
	}),
);
grammy
	.filter((ctx) => {
		if (ctx.msg && 'media_group_id' in ctx.msg) {
			return false;
		}
		return true;
	})
	.use(rateLimit());
grammy.use(hydrateReply<GrammyContext>);

grammy.use(session);

grammy.use(ping);
grammy.use(conversations());
grammy.use(cancelCommand);
grammy.use(conversationComposer);
grammy.use(menus);
grammy.use(commands);

grammy.api
	.setMyCommands(
		listOfCommands.filter((c) => c.show && c.for !== 'admins'),
		{
			scope: {
				type: 'default',
			},
		},
	)
	.then(() => {
		console.log('default commands have been uploaded to BotFather');
	})
	.catch((e) =>
		console.error('Failed to upload default commands to BotFather', e)
	);

grammy.catch((botError) => {
	const ctx = botError.ctx;

	console.error(`Error while handling update ${ctx.update.update_id}:`);
	const e = botError.error;
	if (e instanceof GrammyError) {
		e.description
		console.error('Error in request:', e.description);
	} else if (e instanceof HttpError) {
		console.error('Could not contact Telegram:', e);
	} else {
		console.error('Unknown error:', e);
	}
});
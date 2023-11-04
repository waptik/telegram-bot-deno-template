import '$std/dotenv/load.ts';
import { green } from '$std/fmt/colors.ts';

import { grammy } from '$grammy/bot.ts';

grammy.start({
	drop_pending_updates: false,
	allowed_updates: [
		'callback_query',
		'message',
	], // set to empty if you want to allow all type of updates
	onStart: ({ username }) =>
		console.log(`[bot] @${green(username)} is up and running 🦄`),
});

Deno.addSignalListener('SIGINT', () => grammy.stop());
Deno.addSignalListener('SIGTERM', () => grammy.stop());
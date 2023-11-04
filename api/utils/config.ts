import { getEnvOrThrow } from '$utils/misc.ts';


export default {
	tokens: {
		telegram: getEnvOrThrow('TELEGRAM_BOT_TOKEN'),
	},
	appUrl: Deno.env.get('APP_URL'), // Your production app base url
	enableWebhookChanges: Deno.env.get('ENABLE_WEBHOOK_CHANGES') === 'true' ||
		false,
	admins: [12345678] // user ids of bot admins
};
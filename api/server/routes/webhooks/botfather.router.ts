import { Router } from 'oak';
import { webhookCallback } from 'grammy';

import { grammy } from '$grammy/bot.ts';
import config from '$utils/config.ts';
import { getErrorFromUnknown } from '$utils/errors.ts';

const botfatherRouter = new Router();
const handleUpdate = webhookCallback(grammy, 'oak');

botfatherRouter.post(`/telegram/${config.tokens.telegram}`, async (ctx) => {
	try {
		//
		await handleUpdate(ctx);
	} catch (e) {
		const error = getErrorFromUnknown(e);
		console.error('Botfather error', error);
		ctx.response.status = 400;
	}
});

export default botfatherRouter;
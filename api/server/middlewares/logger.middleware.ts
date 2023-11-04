import { Context, Middleware } from 'oak';

import { blue, bold, cyan, green, yellow } from '$std/fmt/colors.ts';

function loggerMiddleware(): Middleware {
	return async function loggerMiddleware(ctx: Context, next) {
		// const start = Date.now()
		const requestId = ctx.request.headers.get('X-Response-Id');

		console.log({ requestId });

		await next();
		// const ms = Date.now() - start
		const reqTime = ctx.response.headers.get('X-Response-Time');
		const status = ctx.response.status;
		console.log(
			`${green(ctx.request.method)} ${
				cyan(
					decodeURIComponent(ctx.request.url.pathname),
				)
			} - ${blue(bold(String(reqTime)))} [${yellow(String(status))}]`,
		);
	};
}

export { loggerMiddleware };
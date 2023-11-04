import { Router } from 'oak';

export const mainRouter = new Router();

mainRouter.get('', (ctx) => {
	ctx.response.body = 'hello world';
});

/**
 * Prevent indexation from search engines
 * (out of 'production' environment)
 */
mainRouter.get('/robots.txt', ({ response }) => {
	response.headers.set('Content-Type', 'text/plain');
	if (isDev || Deno.env.get('ROBOTS_DISALLOW')) {
		response.body = 'User-agent: *\nDisallow: /';
	} else {
		response.body = 'User-agent: *\nAllow: /';
	}
});

export default mainRouter;